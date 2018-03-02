from django.contrib import admin

from .models import Brick, Dashboard, Muro, BrickLocation


class BrickAdmin(admin.ModelAdmin):
    pass


admin.site.register(Brick, BrickAdmin)


class BrickLocationInline(admin.TabularInline):
    model = BrickLocation


class DashboardAdmin(admin.ModelAdmin):
    inlines = [
        BrickLocationInline
    ]


admin.site.register(Dashboard, DashboardAdmin)


class MuroAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title",)}


admin.site.register(Muro, MuroAdmin)
