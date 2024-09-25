from unittest.mock import patch

import pytest
from rest_framework.test import APIRequestFactory

from twitter_sentiment_price.tweet_analyzer.api.views import InfluencerViewSet
from twitter_sentiment_price.tweet_analyzer.models import Influencer
from twitter_sentiment_price.tweet_analyzer.tasks import get_tweets_task
from twitter_sentiment_price.users.models import User


@pytest.mark.django_db
class TestInfluencerViewSet:
    @pytest.fixture
    def api_client(self) -> APIRequestFactory:
        return APIRequestFactory()

    @patch.object(get_tweets_task, "delay")
    def test_add_influencer(self, mock_get_tweets_task, user: User, api_client: APIRequestFactory):
        view = InfluencerViewSet.as_view(actions={"post": "create"})

        request = api_client.post("/fake-url/", {"username": "MMCrypto"})
        request.user = user

        response = view(request)
        response.render()

        assert response.status_code == 201
        assert response.data == {"username": "MMCrypto"}
        assert Influencer.objects.count() == 1

        mock_get_tweets_task.assert_called_with(twitter_handle="MMCrypto")

    @patch.object(get_tweets_task, "delay")
    def test_fetch_tweets(self, mock_get_tweets_task, user: User, api_client: APIRequestFactory):
        Influencer.objects.create(username="MMCrypto")

        view = InfluencerViewSet.as_view(actions={"post": "fetch_tweets"})

        request = api_client.post("/fake-url/")
        request.user = user

        response = view(request, twitter_handle="MMCrypto")
        response.render()

        assert response.status_code == 200

        mock_get_tweets_task.assert_called_with(twitter_handle="MMCrypto")
