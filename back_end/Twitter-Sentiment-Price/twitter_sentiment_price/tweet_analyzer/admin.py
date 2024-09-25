from django.conf import settings
from django.contrib import admin
from django.db.models import JSONField
from django.utils.html import format_html
from django_json_widget.widgets import JSONEditorWidget

from twitter_sentiment_price.tweet_analyzer.external_models import Accounts as TwscrapeAccount
from twitter_sentiment_price.tweet_analyzer.models import (
    Influencer,
    PriceTrendAnalysis,
    PromptTemplate,
    Tweet,
    TweetSentiment,
)


@admin.register(Influencer)
class InfluencerAdmin(admin.ModelAdmin):
    @admin.display(description="Profile image display")
    def view_profile_image(self, obj):  # noqa
        if obj.profile_image_url:
            return format_html(f'<img src="{obj.profile_image_url}" max-width="800" max-height="800"/>')
        else:
            return "No image yet!"

    @admin.display(description="Profile banner display")
    def view_profile_banner(self, obj):  # noqa
        if obj.profile_banner_url:
            return format_html(f'<img src="{obj.profile_banner_url}" max-width="800" max-height="800"/>')
        else:
            return "No image yet!"

    readonly_fields = ["view_profile_image", "view_profile_banner"]
    search_fields = ["username", "display_name"]


@admin.register(Tweet)
class TweetAdmin(admin.ModelAdmin):
    list_display = [
        "tweet_id",
        "view_username",
        "raw_content",
        "view_mentioned_tokens",
        "view_sentiment_score",
        "view_sentiment_category",
        "date",
    ]
    list_filter = [
        "user__username",
        "mentioned_tokens__symbol",
        "sentiments__category",
    ]
    search_fields = ["tweet_id"]
    formfield_overrides = {JSONField: {"widget": JSONEditorWidget}}

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        defer = ("meta_data",)
        prefetch_related = ("sentiments",)
        return queryset.defer(*defer).prefetch_related(*prefetch_related)

    @admin.display(
        description="Twitter handle",
        ordering="twitter_handle",
    )
    def view_username(self, obj):  # noqa
        return obj.user.username

    @admin.display(description="Mentioned tokens")
    def view_mentioned_tokens(self, obj):  # noqa
        return ", ".join([t.symbol.upper() for t in obj.mentioned_tokens.all()])

    @admin.display(description="Sentiment score")
    def view_sentiment_score(self, obj):  # noqa
        sentiments = obj.sentiments.all()
        if not sentiments:
            return None
        sentiment = sentiments[0]
        return f"{sentiment.score}"

    @admin.display(description="Sentiment category")
    def view_sentiment_category(self, obj):  # noqa
        sentiments = obj.sentiments.all()
        if not sentiments:
            return None
        sentiment = sentiments[0]
        return f"{sentiment.category}"


@admin.register(PromptTemplate)
class PromptTemplateAdmin(admin.ModelAdmin):
    pass


@admin.register(TweetSentiment)
class TweetSentimentAdmin(admin.ModelAdmin):
    list_display = [
        "view_tweet_id",
        "score",
        "category",
    ]
    list_filter = ["category"]
    search_fields = ["tweet_id__exact", "tweet__tweet_id"]

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        return queryset.prefetch_related("tweet", "tweet__user").select_related("tweet__user")

    @admin.display(description="Tweet ID")
    def view_tweet_id(self, obj):  # noqa
        return obj.tweet.tweet_id


@admin.register(PriceTrendAnalysis)
class PriceTrendAnalysisAdmin(admin.ModelAdmin):
    @admin.display(description="Plot image display")
    def view_plot_image(self, obj):  # noqa
        return format_html(f'<img src="{obj.plot_image.url}" max-width="800" max-height="800"/>')

    readonly_fields = ["tweet", "plot_image", "view_plot_image"]
    formfield_overrides = {JSONField: {"widget": JSONEditorWidget}}


if "twscrape" in settings.DATABASES:

    @admin.register(TwscrapeAccount)
    class TwscrapeAccountAdmin(admin.ModelAdmin):
        list_display = ["username", "email", "active", "stats", "last_used"]
        list_filter = ["active"]

        def __init__(self, model, admin_site):
            super().__init__(model, admin_site)
            self.opts.verbose_name = "Twitter Account"
            self.opts.verbose_name_plural = "Twitter Accounts"

        def get_queryset(self, request):
            return TwscrapeAccount.objects.using("twscrape").all()

        def has_view_or_change_permission(self, request, obj=...):
            return request.user.is_superuser
