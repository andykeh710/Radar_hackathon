from rest_framework import serializers

from twitter_sentiment_price.tweet_analyzer.models import Influencer


class InfluencerCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Influencer
        fields = [
            "username",
        ]


class InfluencerDetailsSerializer(serializers.ModelSerializer):
    num_tweets = serializers.IntegerField(read_only=True)
    num_tweets_mentioned_tokens = serializers.IntegerField(read_only=True)

    class Meta:
        model = Influencer
        fields = [
            "id",
            "username",
            "num_tweets",
            "num_tweets_mentioned_tokens",
            "created",
        ]
