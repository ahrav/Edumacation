from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    ArticlesFavoriteAPIView,
    ArticlesFeedAPIView,
    ArticleViewSet,
    CommentsDestroyAPIView,
    CommentsListCreateAPIView,
    TagListAPIView,
    ArticlesPopularFavoritesAPIView,
    ArticlesPopularCommentsAPIView,
)

router = DefaultRouter()
router.register("articles", ArticleViewSet)

app_name = "articles"
urlpatterns = [
    path(
        "articles/popular/favorites/",
        ArticlesPopularFavoritesAPIView.as_view(),
        name="articles-popular-favorites",
    ),
    path(
        "articles/popular/comments/",
        ArticlesPopularCommentsAPIView.as_view(),
        name="articles-popular-comments",
    ),
    path("articles/feed/", ArticlesFeedAPIView.as_view(), name="article-feed"),
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
    path("", include(router.urls)),
]
