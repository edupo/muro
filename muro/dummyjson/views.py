from django.http import JsonResponse

from .models import DummyJSON

# Create your views here.


def json_feed(request):
    try:
        return JsonResponse(DummyJSON.objects.get().jsonfield)
    except DummyJSON.DoesNotExist:
        return JsonResponse({})
