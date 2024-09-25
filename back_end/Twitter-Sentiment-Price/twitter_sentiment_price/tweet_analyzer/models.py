from django.core.serializers.json import DjangoJSONEncoder
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.db.models import JSONField
from model_utils.models import TimeStampedModel

from twitter_sentiment_price.crypto.models import Token
from twitter_sentiment_price.tweet_analyzer.managers import (
    InfluencerManager,
    PriceTrendAnalysisManager,
    TweetManager,
    TweetSentimentManager,
)


class Influencer(TimeStampedModel):
    """"""

    """
    Fields that extracted from Twitter go here
    """
    username = models.CharField(max_length=64, unique=True)
    display_name = models.CharField(blank=True)
    url = models.URLField(blank=True)
    profile_image_url = models.URLField(blank=True)
    profile_banner_url = models.URLField(blank=True)
    """"""

    objects = InfluencerManager()

    def __str__(self):
        return f"@{self.username} - {self.display_name}"


class Tweet(TimeStampedModel):
    """"""

    user = models.ForeignKey(Influencer, on_delete=models.CASCADE, related_name="tweets")
    meta_data = JSONField(encoder=DjangoJSONEncoder)
    sanitized_content = models.TextField(null=True)
    mentioned_tokens = models.ManyToManyField(Token)

    """
    Fields that extracted from Twitter go here
    """
    tweet_id = models.CharField(max_length=24, unique=True)  # https://developer.twitter.com/en/docs/twitter-ids
    date = models.DateTimeField(null=True)
    lang = models.CharField(max_length=8, null=True)
    raw_content = models.TextField(null=True)
    """"""

    objects = TweetManager()

    class Meta(TimeStampedModel.Meta):
        indexes = [
            models.Index(fields=["-date"]),
        ]
        ordering = ["-date"]

    def __str__(self):
        return f"{self.user.username} {self.tweet_id} {self.raw_content}"


class PromptTemplate(TimeStampedModel):
    text = models.TextField(null=False, blank=False)


class Sentiment(TimeStampedModel):
    class Sentiment(models.TextChoices):
        POSITIVE = "positive"
        NEGATIVE = "negative"
        NEUTRAL = "neutral"

    class LLM(models.TextChoices):
        # format is <framework>_<model>
        LANGCHAIN_GPT4 = "langchain_gpt4"
        LANGCHAIN_GPT35 = "langchain_gpt35"

    class TimeFrame(models.TextChoices):
        M15 = "m15"
        M30 = "m30"
        M60 = "m60"

    user = models.ForeignKey(Influencer, on_delete=models.CASCADE)
    prompt_template = models.ForeignKey(PromptTemplate, on_delete=models.CASCADE)
    sentiment = models.CharField(max_length=16, choices=Sentiment.choices, null=True, blank=False)
    score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=False)
    model = models.CharField(max_length=32, choices=LLM.choices, null=True, blank=False)
    prompt = models.TextField(null=True, blank=False)
    frame = models.CharField(max_length=8, choices=TimeFrame.choices, null=True, blank=False)
    token = models.CharField(max_length=10, null=True, blank=False)

    class Meta(TimeStampedModel.Meta):
        pass


class TweetSentiment(TimeStampedModel):
    class Category(models.TextChoices):
        VERY_NEGATIVE = "very negative"
        NEGATIVE = "negative"
        NEUTRAL = "neutral"
        POSITIVE = "positive"
        VERY_POSITIVE = "very positive"

    tweet = models.ForeignKey(Tweet, related_name="sentiments", on_delete=models.CASCADE)
    score = models.PositiveSmallIntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)])
    category = models.CharField(max_length=32, choices=Category.choices)
    explain = models.TextField(default=None, null=True)

    objects = TweetSentimentManager()

    class Meta(TimeStampedModel.Meta):
        indexes = [
            models.Index(fields=["category"]),
        ]


class PeriodicTaskRun(TimeStampedModel):
    name = models.CharField(max_length=200, verbose_name="Task Name")
    every = models.PositiveIntegerField(validators=[MinValueValidator(0)], default=0)
    period = models.CharField(max_length=24, null=True, blank=False)
    last_run_at = models.DateTimeField(default=None)

    class Meta(TimeStampedModel.Meta):
        indexes = [
            models.Index(fields=["name"]),
        ]


class PriceTrendAnalysis(TimeStampedModel):
    tweet = models.ForeignKey(Tweet, related_name="price_trend_analyses", on_delete=models.CASCADE)
    trend = models.CharField(max_length=32)
    start_date = models.DateField()
    end_date = models.DateField()
    period = models.DurationField()
    interval = models.DurationField()
    plot_image = models.ImageField(upload_to="plots")
    meta_data = JSONField(encoder=DjangoJSONEncoder)

    objects = PriceTrendAnalysisManager()

    class Meta:
        verbose_name_plural = "Price Trend Analyses"

    def __str__(self):
        return f"({self.pk}) {self.trend} {self.period} {self.interval}"
