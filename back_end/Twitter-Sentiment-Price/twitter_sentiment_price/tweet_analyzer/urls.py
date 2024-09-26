from django.urls import path
from . import views

urlpatterns = [
    path('analyze-sentiment/', views.analyze_sentiment, name='analyze_sentiment'),
]