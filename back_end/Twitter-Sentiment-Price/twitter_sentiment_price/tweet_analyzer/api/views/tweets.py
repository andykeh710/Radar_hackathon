import logging
import uuid
from datetime import date, datetime, timedelta
from io import BytesIO
from typing import Literal, TypedDict

import matplotlib.pyplot as plt
import yfinance as yf
from django.core.files import File
from drf_spectacular.utils import extend_schema
from pandas import DataFrame
from rest_framework import mixins, viewsets
from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response
from ta.momentum import RSIIndicator
from ta.trend import macd, macd_diff, macd_signal, sma_indicator

from twitter_sentiment_price.tweet_analyzer.api.filters import TweetFilter
from twitter_sentiment_price.tweet_analyzer.api.serializers import TweetListSerializer
from twitter_sentiment_price.tweet_analyzer.models import PriceTrendAnalysis, Tweet

log = logging.getLogger(__name__)


class IndicatorConfigInfo(TypedDict):
    params: dict
    weight: float


class AnalyzeConfigInfo(TypedDict):
    period: timedelta
    interval: Literal["1m", "2m", "5m", "15m", "30m", "60m", "90m", "1h", "1d", "5d", "1wk", "1mo", "3mo"]
    interval_timedelta: timedelta

    sma_config: IndicatorConfigInfo
    macd_config: IndicatorConfigInfo
    rsi_config: IndicatorConfigInfo


ANALYSES: list[AnalyzeConfigInfo] = [
    {
        "period": timedelta(minutes=30),
        "interval": "1m",
        "interval_timedelta": timedelta(minutes=1),
        "sma_config": {
            "params": {"window": 5},
            "weight": 0.4,
        },
        "macd_config": {
            "params": {
                "window_fast": 5,
                "window_slow": 10,
            },
            "weight": 0.4,
        },
        "rsi_config": {
            "params": {"window": 5},
            "weight": 0.2,
        },
    },
    {
        "period": timedelta(hours=1),
        "interval": "1m",
        "interval_timedelta": timedelta(minutes=1),
        "sma_config": {
            "params": {"window": 20},
            "weight": 0.4,
        },
        "macd_config": {
            "params": {
                "window_fast": 10,
                "window_slow": 20,
            },
            "weight": 0.4,
        },
        "rsi_config": {
            "params": {"window": 20},
            "weight": 0.2,
        },
    },
    {
        "period": timedelta(hours=6),
        "interval": "1m",
        "interval_timedelta": timedelta(minutes=1),
        "sma_config": {
            "params": {"window": 20},
            "weight": 0.4,
        },
        "macd_config": {
            "params": {
                "window_fast": 15,
                "window_slow": 30,
            },
            "weight": 0.4,
        },
        "rsi_config": {
            "params": {"window": 20},
            "weight": 0.2,
        },
    },
]


def get_price_df(
    ticker,
    start_time: datetime,
    period: timedelta,
    interval: str,
) -> tuple[DataFrame, date, date]:
    start_time = start_time.replace(second=0, microsecond=0)
    end_time = start_time + period

    start_date = start_time.date()
    end_date = start_time + period
    if period < timedelta(days=1):
        end_date += timedelta(days=1)
    end_date = end_date.date()

    data = yf.download(
        ticker,
        start=start_date,
        end=end_date,
        interval=interval,
    )
    data = data.loc[(data.index >= start_time) & (data.index <= end_time)]

    return data, start_date, end_date


class TweetViewSet(
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Tweet.objects.all()
    serializer_class = TweetListSerializer
    filterset_class = TweetFilter

    @extend_schema(request=None, responses=None)
    @action(detail=True, methods=["post"], url_path="analyze-price-trends")
    def analyze_price_trends(self, request: Request, **kwargs):
        tweet: Tweet = self.get_object()

        ticker = "BTC-USD"  # TODO: Get ticker from mentioned tokens

        for analyze_config in ANALYSES:
            data, start_date, end_date = get_price_df(
                ticker,
                start_time=tweet.date,
                period=analyze_config["period"],
                interval=analyze_config["interval"],
            )
            token_histogram = data["Close"]
            weight_ta = 0

            # Analyze the price trend using a simple moving average (SMA)
            sma_5 = sma_indicator(token_histogram, **analyze_config["sma_config"]["params"])
            current_price = token_histogram.iloc[-1]
            weight_ta += analyze_config["sma_config"]["weight"] if current_price > sma_5.iloc[-1] else 0

            # analyze the price trend use MACD (Moving Average Convergence Divergence)
            macd_kwargs = analyze_config["macd_config"]["params"]
            macd_5 = macd(token_histogram, **macd_kwargs)
            macd_signal_5 = macd_signal(token_histogram, **macd_kwargs)
            macd_diff_5 = macd_diff(token_histogram, **macd_kwargs)
            weight_ta += analyze_config["macd_config"]["weight"] if macd_diff_5.iloc[-1] > 0 else 0

            # analyze the price trend use RSI (Relative Strength Index)
            rsi = RSIIndicator(token_histogram, **analyze_config["rsi_config"]["params"])
            rsi_5 = rsi.rsi()
            weight_ta += analyze_config["rsi_config"]["weight"] if rsi_5.iloc[-1] < 30 else 0

            _, axs = plt.subplots(3, sharex=True)

            # Price and SMAs plot
            axs[0].plot(token_histogram, label="Price")
            axs[0].plot(sma_5, label="SMA")
            axs[0].set_ylabel("Price (USD)", color="blue")
            axs[0].tick_params(axis="y", labelcolor="blue")

            # MACD plot
            axs[1].plot(macd_5, label="MACD", color="blue")
            axs[1].plot(macd_signal_5, label="Signal", color="red")
            axs[1].plot(macd_diff_5, label="Difference", color="green")
            # axs[1].bar(data.index, token_histogram, color="blue")
            axs[1].fill_between(data.index, macd_5, macd_signal_5, color="lightgreen", alpha=0.5)
            axs[1].set_ylabel("MACD")

            # RSI plot
            axs[2].plot(rsi_5, label="RSI")
            axs[2].axhline(70, color="red", linestyle="--", label="Overbought")
            axs[2].axhline(30, color="green", linestyle="--", label="Oversold")

            # # Customize the plot
            # plt.title(f"Bitcoin Price and Trend ({start_time_str} to {end_time_str})")
            # plt.xlabel("Datetime")
            # plt.ylabel("Price (USD)")
            # plt.legend()
            # plt.grid(True)

            # Create buffered image
            buffer = BytesIO()
            plt.savefig(buffer, format="png")
            plt.clf()  # Clears the entire current figure with all its axes
            buffer.seek(0)

            # Save to database
            PriceTrendAnalysis.objects.create(
                tweet=tweet,
                trend="Up" if weight_ta > 0.5 else "Down",
                start_date=start_date,
                end_date=end_date,
                period=analyze_config["period"],
                interval=analyze_config["interval_timedelta"],
                plot_image=File(buffer, name=f"{uuid.uuid4().hex}.png"),
                meta_data=analyze_config,
            )

        return Response(data={"hello": tweet.sanitized_content})
