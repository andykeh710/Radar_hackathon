import operator
from functools import reduce

from django.db.models import Q
from django_filters import rest_framework as filters

from twitter_sentiment_price.tweet_analyzer.models import Tweet, TweetSentiment


class TweetFilter(filters.FilterSet):
    twitter_handle = filters.CharFilter(field_name="user__username", label="Twitter handle")

    mentioned_tokens = filters.CharFilter(method="filter_mentioned_tokens")
    has_mentioned_tokens = filters.BooleanFilter(method="filter_has_mentioned_tokens", label="Has mentioned tokens")

    sentiment_category = filters.ChoiceFilter(
        field_name="sentiments__category", choices=TweetSentiment.Category.choices
    )

    date = filters.DateTimeFromToRangeFilter(field_name="date")

    def filter_mentioned_tokens(self, queryset, name, value):  # noqa
        condition = reduce(
            operator.or_,
            [Q(mentioned_tokens__symbol__iexact=s) | Q(mentioned_tokens__name__iexact=s) for s in value.split(",")],
        )
        return queryset.filter(condition)

    def filter_has_mentioned_tokens(self, queryset, name, value):  # noqa
        condition = Q(mentioned_tokens=None)
        if value:
            condition = ~condition
        return queryset.filter(condition)

    class Meta:
        model = Tweet
        fields = ["twitter_handle", "has_mentioned_tokens", "date"]
