# Generated by Django 4.2.7 on 2023-12-11 17:41

from django.db import migrations, models
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):
    dependencies = [
        ("tweet_analyzer", "0009_remove_sentiment_frame_last_tweet_id_sentiment_token"),
    ]

    operations = [
        migrations.CreateModel(
            name="PeriodicTaskRun",
            fields=[
                (
                    "created",
                    model_utils.fields.AutoCreatedField(
                        default=django.utils.timezone.now, editable=False, verbose_name="created"
                    ),
                ),
                (
                    "modified",
                    model_utils.fields.AutoLastModifiedField(
                        default=django.utils.timezone.now, editable=False, verbose_name="modified"
                    ),
                ),
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=200, verbose_name="Task Name")),
                ("last_run_at", models.DateTimeField(blank=True, null=True)),
            ],
            options={
                "abstract": False,
                "indexes": [models.Index(fields=["name"], name="periodic_task_run_name_idx")],
            },
        ),
    ]
