from .models import Muro
from django.http import JsonResponse, Http404


def muro_feed(request, slug):
    try:
        return JsonResponse(Muro.objects.get(slug=slug).to_json())
    except Muro.DoesNotExist:
        return Http404
