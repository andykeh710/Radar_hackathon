import json
from http import HTTPStatus
from typing import Literal

import structlog
from django.db.models import Q
from django.db.models.aggregates import Count
from drf_spectacular.utils import extend_schema
from langchain import prompts
from langchain.output_parsers import PydanticOutputParser
from langchain_community.callbacks import get_openai_callback
from langchain_community.chat_models import ChatOpenAI
from langchain_core.pydantic_v1 import BaseModel, Field
from rest_framework import mixins, viewsets
from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response

from twitter_sentiment_price.tweet_analyzer.api.serializers import (
    InfluencerCreateSerializer,
    InfluencerDetailsSerializer,
    InfluencerSerializer,
    TweetSentimentInputSerializer,
    TweetSerializer,
)
from twitter_sentiment_price.tweet_analyzer.models import Influencer, Tweet, TweetSentiment
from twitter_sentiment_price.tweet_analyzer.tasks import get_tweets_task

logger = structlog.get_logger(__name__)

PROMPT_TEMPLATE = """You're a cryptocurrency trader with 10+ years of experience.
You always follow the trend and follow and deeply understand crypto experts on Twitter.
You always consider the historical predictions for each expert on Twitter.

You're given tweets and their data from @{twitter_handle} in JSON format:
{tweets}

{format_instructions}
"""


class TweetSentimentOutputFormat(BaseModel):
    tweet_id: str = Field(description="ID of the tweet")
    score: int = Field(
        description="Use numbers between 0 and 100, where 0 is extremely bearish and 100 is extremely bullish.",
        ge=0,
        le=100,
    )
    category: Literal["very negative", "negative", "neutral", "positive", "very positive"] = Field(
        description="Assign a sentiment category to each tweet"
    )
    explain: str | None = Field(
        description="Put your explanation why you got this result for this Tweet here if you got any", default=None
    )


class SentimentOutputFormat(BaseModel):
    sentiments: list[TweetSentimentOutputFormat]


def create_tweet_list_for_prompt(tweets: list[Tweet]) -> str:
    text = ""
    for tweet in tweets:
        text += f"{tweet.tweet_id}: {tweet.sanitized_content}\n"
    return text


class InfluencerViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Influencer.objects.all()
    serializer_class = InfluencerSerializer
    lookup_field = "username__iexact"
    lookup_url_kwarg = "twitter_handle"

    def get_serializer_class(self):
        if self.action == "create":
            return InfluencerCreateSerializer
        if self.action in ["retrieve", "list"]:
            return InfluencerDetailsSerializer
        return super().get_serializer_class()

    def get_queryset(self):
        queryset = super().get_queryset()

        if self.action in ["retrieve", "list"]:
            return Influencer.objects.annotate(
                num_tweets=Count("tweets"),
                num_tweets_mentioned_tokens=Count(
                    "tweets",
                    filter=~Q(tweets__mentioned_tokens=None),
                    distinct=True,
                ),
            )

        return queryset

    @extend_schema(responses=TweetSerializer(many=True))
    @action(detail=True, methods=["get"], url_path="tweets")
    def get_tweets(self, request: Request, **kwargs):
        tweets = Tweet.objects.filter(user=self.get_object())
        return Response(TweetSerializer(tweets, many=True).data)

    @extend_schema(description="Onboarding 100 latest tweets of this influencer", request=None, responses=None)
    @action(detail=True, methods=["post"], url_path="fetch")
    def fetch_tweets(self, request: Request, **kwargs):
        get_tweets_task.delay(twitter_handle=self.get_object().username)
        return Response(HTTPStatus.OK)

    @extend_schema(request=None, responses=None)
    @action(detail=True, methods=["post"], url_path="get-sentiment")
    def get_sentiment_price(self, request: Request, **kwargs):
        influencer: Influencer = self.get_object()
        valid_tweets = Tweet.objects.filter(~Q(mentioned_tokens=None), user=influencer)[:3]
        logger.info("get_sentiment_price", influencer=influencer, num_tweets=len(valid_tweets))

        """
        https://python.langchain.com/docs/modules/chains/foundational/llm_chain#using-lcel
        """

        # Model
        model_kwargs = {
            "model_name": "gpt-4",
            "temperature": 0.0,
        }
        chat_gpt = ChatOpenAI(**model_kwargs)

        # Set up a parser
        output_parser = PydanticOutputParser(pydantic_object=SentimentOutputFormat)

        # Inject instructions into the prompt template.
        prompt = prompts.PromptTemplate.from_template(
            PROMPT_TEMPLATE,
            input_variable=["twitter_handle", "tweets"],
            partial_variables={"format_instructions": output_parser.get_format_instructions()},
        )

        # LangChain Expression Language
        chain = prompt | chat_gpt | output_parser

        # Get output
        invoke_input = {
            "twitter_handle": influencer.username,
            "tweets": json.dumps(
                TweetSentimentInputSerializer(valid_tweets, many=True).data,
                indent=2,
            ),
        }
        print(prompt.format_prompt(**invoke_input).to_string())
        with get_openai_callback() as cb:
            # https://python.langchain.com/docs/modules/model_io/llms/token_usage_tracking
            sentiment_output: SentimentOutputFormat = chain.invoke(invoke_input)
            print(f"Total Tokens: {cb.total_tokens}")
            print(f"Prompt Tokens: {cb.prompt_tokens}")
            print(f"Completion Tokens: {cb.completion_tokens}")
            print(f"Total Cost (USD): ${cb.total_cost}")

        sentiments: list[TweetSentimentOutputFormat] = sentiment_output.sentiments
        for s in sentiments:
            tweet = Tweet.objects.get(tweet_id=s.tweet_id)
            TweetSentiment.objects.create(
                tweet=tweet,
                score=s.score,
                category=s.category,
                explain=s.explain,
            )

        return Response(data=json.loads(sentiment_output.json()), status=200)
