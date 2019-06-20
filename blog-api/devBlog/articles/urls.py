from django.urls import include, path

from rest_framework.routers import DefaultRouter

from .views import ArticleViewSet

router = DefaultRouter()
router.register(r"articles", ArticleViewSet)

app_name = "articles"
urlpatterns = [path("", include(router.urls))]
