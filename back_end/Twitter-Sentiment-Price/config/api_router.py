from django.conf import settings
from rest_framework.routers import DefaultRouter, SimpleRouter

from twitter_sentiment_price.tweet_analyzer.api.views import InfluencerViewSet, TweetViewSet, TwscrapeAccountViewSet
from twitter_sentiment_price.users.api.views import UserViewSet

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()

router.register("users", UserViewSet)
router.register("influencers", InfluencerViewSet)
router.register("tweets", TweetViewSet)

if "twscrape" in settings.DATABASES:
    router.register("externals/twscrape/accounts", TwscrapeAccountViewSet)

app_name = "api"
urlpatterns = router.urls
