# Generated by Django 4.2.7 on 2023-11-26 23:27

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("tweet_analyzer", "0006_remove_tweet_tweet_tweet_id_unique_idx_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="tweet",
            old_name="external_id",
            new_name="tweet_id",
        ),
    ]
