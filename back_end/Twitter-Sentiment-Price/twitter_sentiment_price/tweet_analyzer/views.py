from rest_framework.decorators import api_view
from rest_framework.response import Response
from .tasks import analyze_tweet_sentiment

@api_view(['POST'])
def analyze_sentiment(request):
    tweet = request.data.get('tweet')
    result = analyze_tweet_sentiment.delay(tweet)
    return Response({'task_id': result.id})