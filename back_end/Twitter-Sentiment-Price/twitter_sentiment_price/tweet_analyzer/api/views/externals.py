from asgiref.sync import async_to_sync
from django.conf import settings
from drf_spectacular.utils import extend_schema
from rest_framework import mixins, serializers, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from twscrape import AccountsPool

from twitter_sentiment_price.tweet_analyzer.external_models import Accounts as TwscrapeAccount
from twitter_sentiment_price.utils.permissions import IsSuperuser


class TwscrapeAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = TwscrapeAccount
        fields = ["username", "email", "active"]


class TwscrapeAccountCreateSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    email = serializers.CharField()
    email_password = serializers.CharField()
    cookies = serializers.CharField()

    def to_representation(self, instance):  # noqa
        return TwscrapeAccountSerializer(instance).data


class TwscrapeAccountViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = TwscrapeAccount.objects.using("twscrape").all()
    serializer_class = TwscrapeAccountSerializer
    permission_classes = [IsSuperuser]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.pool = AccountsPool(settings.DATABASES["twscrape"]["NAME"])

    def get_serializer_class(self):
        if self.action == "create":
            return TwscrapeAccountCreateSerializer
        return super().get_serializer_class()

    def perform_create(self, serializer):
        async_to_sync(self.pool.add_account)(**serializer.validated_data)
        username = serializer.validated_data["username"]
        serializer.instance = self.get_queryset().get(username=username)

    @extend_schema(request=None, responses=None)
    @action(detail=False, methods=["post"], url_path="login-all")
    def login_accounts(self, request, **kwargs):
        return Response(async_to_sync(self.pool.login_all)(False))
