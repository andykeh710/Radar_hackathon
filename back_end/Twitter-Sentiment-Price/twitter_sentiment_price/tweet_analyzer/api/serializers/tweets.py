import twscrape
from rest_framework import serializers

from twitter_sentiment_price.tweet_analyzer.models import Tweet


class TweetSentimentInputSerializer(serializers.ModelSerializer):
    view_count = serializers.SerializerMethodField()
    retweet_count = serializers.SerializerMethodField()

    class Meta:
        model = Tweet
        fields = [
            "tweet_id",
            "sanitized_content",
            "lang",
            "view_count",
            "retweet_count",
        ]

    def get_view_count(self, obj) -> int:  # noqa
        return obj.meta_data["viewCount"]

    def get_retweet_count(self, obj) -> int:  # noqa
        return obj.meta_data["retweetCount"]


class TweetListSerializer(serializers.ModelSerializer):
    twitter_handle = serializers.SerializerMethodField()
    mentioned_tokens = serializers.SerializerMethodField()

    class Meta:
        model = Tweet
        exclude = ["user", "meta_data"]

    def get_twitter_handle(self, obj) -> str:  # noqa
        return obj.user.username

    def get_mentioned_tokens(self, obj) -> list[str]:  # noqa
        tokens = obj.mentioned_tokens.all()
        return [str(token) for token in tokens]


class TweetOnboardingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = "__all__"

    def to_internal_value(self, data):  # noqa
        """
        Extract fields from Twitter JSON response
        """
        tweet: twscrape.Tweet = data["meta_data"]

        data["tweet_id"] = tweet.id_str or tweet.id
        data["date"] = tweet.date
        data["lang"] = tweet.lang
        data["raw_content"] = tweet.rawContent

        # Convert to dict type
        data["meta_data"] = tweet.dict()

        return data
