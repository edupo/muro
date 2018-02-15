from django.contrib import admin

from .models import DummyJSON


class DummyJSONAdmin(admin.ModelAdmin):
    pass


admin.site.register(DummyJSON, DummyJSONAdmin)