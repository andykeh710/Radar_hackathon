from django.apps import AppConfig


class TweetAnalyzerConfig(AppConfig):
    verbose_name = "Tweet Analyzer"
    default_auto_field = "django.db.models.BigAutoField"
    name = "twitter_sentiment_price.tweet_analyzer"

    def ready(self):
        try:
            import twitter_sentiment_price.tweet_analyzer.signals  # noqa: F401
        except ImportError:
            pass
