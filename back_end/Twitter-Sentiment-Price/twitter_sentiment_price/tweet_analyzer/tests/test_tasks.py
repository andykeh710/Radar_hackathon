import logging

import pytest
from celery.result import EagerResult

from twitter_sentiment_price.tweet_analyzer.models import Influencer
from twitter_sentiment_price.tweet_analyzer.tasks.base import analyze_tweet_sentiment

logger = logging.getLogger(__name__)


@pytest.fixture(autouse=True)
def influencers(db) -> list[Influencer]:
    influencers = [
        Influencer(username="MMCrypto"),
    ]
    return Influencer.objects.bulk_create(influencers)


@pytest.mark.django_db
def test_exists_influencer():
    assert Influencer.objects.all().count() >= 1


@pytest.mark.django_db
def test_tweet_analyze_sentiment(settings):
    settings.CELERY_TASK_ALWAYS_EAGER = True
    task_result = analyze_tweet_sentiment.delay(name="analyze_tweet_sentiment_15m")
    assert isinstance(task_result, EagerResult)
