from django.db.models.signals import post_save
from django.dispatch import receiver

from twitter_sentiment_price.tweet_analyzer.models import Influencer
from twitter_sentiment_price.tweet_analyzer.tasks import get_tweets_task


@receiver(post_save, sender=Influencer)
def post_save_influencer(sender, instance: Influencer, created, **kwargs):
    if created:
        twitter_handle = instance.username
        get_tweets_task.delay(twitter_handle=twitter_handle)
