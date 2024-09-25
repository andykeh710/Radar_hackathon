from django.db import models


class InfluencerManager(models.Manager):
    pass


class TweetManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().select_related("user").prefetch_related("mentioned_tokens")


class TweetSentimentManager(models.Manager):
    pass


class PriceTrendAnalysisManager(models.Manager):
    pass
