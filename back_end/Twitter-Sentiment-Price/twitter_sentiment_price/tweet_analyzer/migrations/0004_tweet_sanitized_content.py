# Generated by Django 4.2.7 on 2023-11-26 09:47

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("tweet_analyzer", "0003_tweet_date_tweet_lang_tweet_raw_content"),
    ]

    operations = [
        migrations.AddField(
            model_name="tweet",
            name="sanitized_content",
            field=models.TextField(null=True),
        ),
    ]
