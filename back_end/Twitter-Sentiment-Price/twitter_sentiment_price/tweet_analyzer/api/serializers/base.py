from rest_framework import serializers

from twitter_sentiment_price.tweet_analyzer.models import Influencer, Tweet


class TweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        exclude = ["meta_data"]


class InfluencerSerializer(serializers.ModelSerializer):
    tweets = TweetSerializer(many=True)

    class Meta:
        model = Influencer
        fields = "__all__"
