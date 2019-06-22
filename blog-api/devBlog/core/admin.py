from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext as _

from authentication.models import User
from profiles.models import Profile


class UserAdmin(BaseUserAdmin):
    ordering = ["id"]
    list_display = ["email", "username"]
    fieldsets = (
        (None, {"fields": ("email", "username", "password")}),
        (
            _("Permissions"),
            {"fields": ("is_active", "is_staff", "is_superuser")},
        ),
        (_("Important dates"), {"fields": ("last_login",)}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "username", "password"),
            },
        ),
    )


admin.site.register(User, UserAdmin)
admin.site.register(Profile)
