import re
from collections import defaultdict

import pandas as pd
import twscrape
from langchain_community.chat_models import ChatOpenAI
from langchain.output_parsers import PydanticOutputParser
from langchain.prompts import PromptTemplate
from langchain.schema.runnable import RunnableParallel
from pydantic import BaseModel, Field

from twitter_sentiment_price.tweet_analyzer.models import Tweet

PROMPT_TEMPLATE = """
You're a cryptocurrency trader with 10+ years of experience.
You always follow the trend and follow and deeply understand crypto experts on Twitter.
You always consider the historical predictions for each expert on Twitter.
You're given tweets and their view count from @{twitter_handle} about {code}:

{tweets}

Tell how bullish or bearish the tweets for this {code}. \n{format_instructions}
"""


class SentimentInstruction(BaseModel):
    code: str = Field(title="code", description="Crypto code like btc, eth...")
    sentiment: str = Field(title="sentiment", description="Value must be positive, neutral or negative")
    confidence: str = Field(
        title="confidence",
        description="Use numbers between 0 and 100, where 0 is extremely bearish and 100 is extremely bullish",
    )


class AnalyzeSentimentResult:
    def __init__(self, sentiment_ins: SentimentInstruction):
        self._sentiment_ins = sentiment_ins

    @property
    def sentiment_ins(self) -> SentimentInstruction:
        return self._sentiment_ins

    @sentiment_ins.setter
    def sentiment_ins(self, sentiment_ins: SentimentInstruction):
        self._sentiment_ins = sentiment_ins


class TweetsAnalyzeSentimentResult(AnalyzeSentimentResult):
    def __init__(self, prompt: str, result: SentimentInstruction, tweets: list[Tweet]):
        super().__init__(result)
        self._tweets = tweets
        self._prompt = prompt

    @property
    def tweets(self) -> list[Tweet]:
        return self._tweets

    @tweets.setter
    def tweets(self, tweets: list[Tweet]):
        self._tweets = tweets

    @property
    def prompt(self) -> str:
        return self._prompt

    @prompt.setter
    def prompt(self, prompt: str):
        self._prompt = prompt


def clean_tweet(text: str) -> str:
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"www.\S+", "", text)
    return re.sub(r"\s+", " ", text)


def create_dataframe_from_tweets(code: str, tweets: list[twscrape.Tweet]) -> pd.DataFrame:
    rows = []
    for tweet in tweets:
        clean_text = clean_tweet(tweet.rawContent)
        if len(clean_text) == 0:
            continue
        rows.append(
            {
                "id": tweet.id,
                "text": clean_text,
                "author_id": tweet.user.id,
                "author": tweet.user.username,
                "date": str(tweet.date.date()),
                "created_at": tweet.date,
                "views": tweet.viewCount,
                "code": code,
            }
        )

    df = pd.DataFrame(rows, columns=["id", "text", "author_id", "author", "date", "views", "created_at"])
    df.set_index("id", inplace=True)
    if df.empty:
        return df
    # filter df to include tweets within the last 7 days
    # df = df[df.created_at.dt.date > datetime.now().date() - pd.to_timedelta("7day")]
    return df.sort_values(by="created_at", ascending=False)


def create_tweet_list_for_prompt(code: str, tweets: list[Tweet]) -> str:
    user_tweets = create_dataframe_from_tweets(code, tweets)
    if user_tweets.empty:
        return ""
    # only get 100 tweets / query
    if len(user_tweets) > 100:
        user_tweets = user_tweets.sample(n=100)

    text = ""

    for _, row in user_tweets.iterrows():
        text += f"{row.views} - {row.text} - {code}\n"
    return text


def filter_tweets(tweets: list[twscrape.Tweet]) -> dict[str, list[twscrape.Tweet]]:
    codes = {"btc": ["btc", "bitcoin"], "eth": ["eth", "ethereum"]}

    filtered_tweets = defaultdict()

    for code, value in codes.items():
        filtered_tweets[code] = list(filter(lambda tweet: any(v in tweet.rawContent.lower() for v in value), tweets))

    return filtered_tweets


def tweet_analyze_sentiment(
    model_name: str, twitter_handle: str, tweets: list[Tweet]
) -> list[TweetsAnalyzeSentimentResult]:
    model = ChatOpenAI(temperature=0, model=model_name)
    ft = filter_tweets(tweets)
    template_params = defaultdict()
    input_params = []
    parser = PydanticOutputParser(pydantic_object=SentimentInstruction)
    for code, v in ft.items():
        text = create_tweet_list_for_prompt(code=code, tweets=v)
        if text:
            prompt = PromptTemplate(
                template=PROMPT_TEMPLATE,
                input_variables=["twitter_handle", "code", "tweets"],
                partial_variables={"format_instructions": parser.get_format_instructions()},
            )

            template_params[code] = prompt | model | parser
            input_params.append({"twitter_handle": twitter_handle, "code": code, "tweets": text})

    if len(template_params) == 0 or len(input_params) == 0:
        return []

    map_chain = RunnableParallel(template_params)

    chain_result: list[dict[str, SentimentInstruction]] = map_chain.batch(input_params)
    prompt_str = map_chain.json()
    tweet_analyze_sentiment_result = []

    for c in chain_result:
        for _, v in c.items():
            tweet_analyze_sentiment_result.append(TweetsAnalyzeSentimentResult(prompt_str, v, ft[v.code]))
    return tweet_analyze_sentiment_result
