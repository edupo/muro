from django.conf.urls import url
from django.views.generic import TemplateView

from .views import muro_feed


app_name = 'dashboards'

urlpatterns = [
    url(r'^(?P<slug>[\w-]+)/json_feed/$', muro_feed, name='feed'),
    url(r'^(?P<slug>[\w-]+)/$', TemplateView.as_view(template_name='pages/home.html'))
]
