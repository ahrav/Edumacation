from django.apps import AppConfig


class AuthenticationAppConfig(AppConfig):
    name = "edumacate.apps.authentication"
    label = "authentication"
    verbose_name = "Authentication"

    def ready(self):
        import edumacate.apps.authentication.signals


default_app_config = "edumacate.apps.authentication.AuthenticationAppConfig"

