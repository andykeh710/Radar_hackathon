import contextlib
import json
import re
from datetime import datetime, timedelta
from celery import shared_task

import twscrape
from asgiref.sync import async_to_sync
from celery.utils.log import get_task_logger
from django.db import DatabaseError, IntegrityError, transaction
from django.db.models.query import QuerySet
from twscrape import API, gather

from config import celery_app
from twitter_sentiment_price.crypto.models import Token
from twitter_sentiment_price.tweet_analyzer.analyzer import TweetsAnalyzeSentimentResult, tweet_analyze_sentiment
from twitter_sentiment_price.tweet_analyzer.api.serializers import TweetOnboardingSerializer
from twitter_sentiment_price.tweet_analyzer.models import (
    Influencer,
    PeriodicTaskRun,
    PromptTemplate,
    Sentiment,
    Tweet,
    TweetSentiment,
)

logger = get_task_logger(__name__)


async def search_tweets(query, limit=20) -> list[twscrape.Tweet]:
    api = API()
    tweets = await gather(api.search(query, limit=limit))
    return tweets


@celery_app.task
def get_tweets_task(twitter_handle: str | None = None):
    users: list[Influencer]
    if twitter_handle:
        users = [
            Influencer.objects.get(username=twitter_handle),
        ]
    else:
        users = list(Influencer.objects.all())
    logger.info(f"[get_tweets_task] Users: {users}")

    for influencer in users:
        # Get latest tweet of user from db
        last_tweet: Tweet | None = Tweet.objects.filter(user=influencer).first()

        # Build graph query for twscrape.
        # For details see https://github.com/igorbrigadir/twitter-advanced-search
        query: str = f"from:@{influencer.username}"
        if last_tweet:
            since_time = int(last_tweet.date.timestamp())
            query = f"{query} since_time:{since_time}"
        logger.info(f"[get_tweets_task] Twitter query: {query}")

        # Get user's tweets from twscrape
        tweets: list[twscrape.Tweet] = async_to_sync(search_tweets)(query, limit=100)
        for tweet in tweets:
            if tweet.user.username.lower() != influencer.username.lower():
                continue

            data = {
                "user": influencer,
                "meta_data": tweet,
            }
            serializer = TweetOnboardingSerializer(data=data)
            if serializer.is_valid():
                with contextlib.suppress(IntegrityError):
                    created_tweet = serializer.save()
                    sanitize_tweet_content_task.s(created_tweet.id)()
                    find_mentioned_tokens_task.s(created_tweet.id)()
            else:
                logger.warning(f"Got serializer errors: {serializer.errors}")

        # Updating influencer details
        last_tweet: Tweet | None = Tweet.objects.filter(user=influencer).first()
        if last_tweet:
            # TODO: Using serializer
            user_meta_data = last_tweet.meta_data["user"]
            influencer.username = user_meta_data["username"]
            influencer.display_name = user_meta_data["displayname"]
            influencer.url = user_meta_data["url"]
            influencer.profile_image_url = user_meta_data["profileImageUrl"]
            influencer.profile_banner_url = user_meta_data["profileBannerUrl"]

            influencer.save()


@celery_app.task
def sanitize_tweet_content_task(tweet_id: int):
    tweet = Tweet.objects.get(id=tweet_id)
    raw_content = tweet.raw_content

    # TODO: Using serializer
    sanitized_content = re.sub(r"http\S+", "", raw_content)
    sanitized_content = re.sub(r"www.\S+", "", sanitized_content)
    sanitized_content = re.sub(r"\s+", " ", sanitized_content)

    tweet.sanitized_content = sanitized_content

    tweet.save(
        update_fields=[
            "sanitized_content",
        ]
    )


@celery_app.task
def find_mentioned_tokens_task(tweet_id: int):
    tweet = Tweet.objects.get(id=tweet_id)

    sanitized_content = tweet.sanitized_content
    if not sanitized_content:
        return
    sanitized_content = sanitized_content.lower()

    tweet.mentioned_tokens.clear()

    tokens = Token.objects.all()
    for token in tokens:
        if token.symbol.lower() in sanitized_content or token.name.lower() in sanitized_content:
            tweet.mentioned_tokens.add(token)


def minute_2_frame(minute: int):
    if minute == 15:
        return Sentiment.TimeFrame.M15
    elif minute == 30:
        return Sentiment.TimeFrame.M30
    elif minute == 60:
        return Sentiment.TimeFrame.M60
    else:
        return ""


def save_sentiment_result(
    minute: int,
    influencer: Influencer,
    prompt_template: PromptTemplate,
    model: str,
    tweets: QuerySet[Tweet],
    tweet_analyze_sentiment_res: list[TweetsAnalyzeSentimentResult],
):
    # save sentiment to sentiment table and tweet_sentiment table
    for ele in tweet_analyze_sentiment_res:
        if not ele.tweets:
            continue
        try:
            with transaction.atomic():
                # save sentiment to sentiment table
                sentiment = Sentiment(
                    user=influencer,
                    prompt_template=prompt_template,
                    sentiment=ele.sentiment_ins.sentiment,
                    score=ele.sentiment_ins.confidence,
                    model=model,
                    prompt=ele.prompt,
                    frame=minute_2_frame(minute),
                    token=ele.sentiment_ins.code,
                )
                sentiment.save()

                # save sentiment to tweet_sentiment table
                for tweet in ele.tweets:
                    tweet_sentiment = TweetSentiment(
                        tweet=tweets.get(id=tweet.id),
                        sentiment=sentiment,
                    )
                    tweet_sentiment.save()
        except DatabaseError:
            logger.warning(f"DatabaseError: {DatabaseError}")
            continue


@celery_app.task(bind=True)
def analyze_tweet_sentiment(self, **kwargs):
    present = datetime.now()

    # save new period_task_run
    period_task_run = PeriodicTaskRun(
        name=kwargs["name"],
        last_run_at=present,
    )
    period_task_run.save()

    period_task = PeriodicTaskRun.objects.filter(name=kwargs["name"]).order_by("-id").first()
    if period_task is None:
        logger.info("No last_run_at found")
        return

    last_run_at = period_task.last_run_at

    # get last tweet_id each user from tweet table
    influencers: list[Influencer] = list(Influencer.objects.all())
    if not influencers:
        logger.info("No influencers found")
        return

    frame = period_task.every

    prompt_template = PromptTemplate.objects.get(id=1)
    llm_model = "gpt-3.5-turbo"
    model = "langchain_" + llm_model

    for influencer in influencers:
        # get all tweets in Tweet table from last_run_at to present order by tweet_id
        tweets = Tweet.objects.filter(user=influencer, date__gte=last_run_at)
        if not tweets:
            logger.info(f"No tweets found for influencer {influencer.username} from {last_run_at} to {present}")
            continue

        tweet_group: list[Tweet] = []  # get total minutes from last_run_at to present
        tweet_groups: list[list[Tweet]] = []

        last_run_tmp = last_run_at
        for tweet in tweets:
            # TODO: need get real tweet created_at in meta_data
            if tweet.created.minute - last_run_tmp.minute > frame:
                tweet_groups.append(tweet_group)
                tweet_group = []
                last_run_tmp += timedelta(minutes=frame)
            tweet_group.append(tweet)
        if tweet_group:
            tweet_groups.append(tweet_group)

        for tweet_group in tweet_groups:
            # analyze sentiment for group of tweets
            s: list[twscrape.Tweet] = []
            for tweet in tweet_group:
                s.append(twscrape.Tweet(**json.loads(tweet.meta_data)))
            tweet_analyze_sentiment_res: list[TweetsAnalyzeSentimentResult] = tweet_analyze_sentiment(
                llm_model, influencer.username, s
            )

            save_sentiment_result(frame, influencer, prompt_template, model, tweets, tweet_analyze_sentiment_res)
