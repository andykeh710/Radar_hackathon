from django.db import models
from model_utils.models import TimeStampedModel


class Token(TimeStampedModel):
    symbol = models.CharField(max_length=5, unique=True)
    name = models.CharField(max_length=64)

    def __str__(self):
        return f"{self.name} {self.symbol.upper()}"
