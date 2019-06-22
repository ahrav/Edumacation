from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    ArticlesFavoriteAPIView,
    ArticleViewSet,
    CommentsDestroyAPIView,
    CommentsListCreateAPIView,
    TagListAPIView,
)

router = DefaultRouter()
router.register(r"articles", ArticleViewSet)

app_name = "articles"
urlpatterns = [
    path("", include(router.urls)),
    path(
        "articles/<slug:article_slug>/favorite/",
        ArticlesFavoriteAPIView.as_view(),
        name="article-favorite",
    ),
    path(
        "articles/<slug:article_slug>/comments/",
        CommentsListCreateAPIView.as_view(),
        name="comment-detail",
    ),
    path(
        "articles/<slug:article_slug>/comments/<int:comment_pk>/",
        CommentsDestroyAPIView.as_view(),
        name="comment-delete",
    ),
    path("tags/", TagListAPIView.as_view(), name="tag-list"),
]
