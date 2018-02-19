from django.db import models

from core.jsonfield import JSONField


class DummyJSON(models.Model):
    jsonfield = JSONField(blank=True, null=True)
