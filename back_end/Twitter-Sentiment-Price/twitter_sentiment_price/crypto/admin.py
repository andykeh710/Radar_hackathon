from django.contrib import admin

from twitter_sentiment_price.crypto.models import Token


@admin.register(Token)
class TokenAdmin(admin.ModelAdmin):
    list_display = ["id", "symbol", "name"]
