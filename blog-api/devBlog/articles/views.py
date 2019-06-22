from rest_framework import generics, mixins, status, viewsets
from rest_framework.exceptions import NotFound
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
)
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Article, Comment, Tag

# from .renderers import ArticleJSONRenderer, CommentJSONRenderer
from .serializers import ArticleSerializer, CommentSerializer, TagSerializer


class ArticleViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    """View for creating articles"""

    queryset = Article.objects.select_related("author", "author__user")
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = ArticleSerializer
    # renderer_classes = (ArticleJSONRenderer,)
    lookup_field = "slug"

    def create(self, request):
        """method to create new articles"""

        serializer_context = {
            "author": request.user.profile,
            "request": request,
        }
        serializer_data = request.data.get("article", {})
        serializer = self.serializer_class(
            data=serializer_data, context=serializer_context
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request):
        """method to return all articles"""

        serializer_context = {"request": request}
        page = self.paginate_queryset(self.queryset)

        serializer = self.serializer_class(
            page, context=serializer_context, many=True
        )

        return self.get_paginated_response(serializer.data)

    def update(self, request, slug):
        """method to handler updating articles with given slug"""

        serializer_context = {"request": request}
        try:
            serializer_instance = self.queryset.get(slug=slug)
        except Article.DoesNotExist:
            raise NotFound("An article with this slug does not exist")

        serializer_data = request.data.get("article", {})

        serializer = self.serializer_class(
            serializer_instance,
            context=serializer_context,
            data=serializer_data,
            partial=True,
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, slug):
        """method to retrieve all articles for a given slug"""

        serializer_context = {"request": request}
        try:
            serializer_instance = self.queryset.get(slug=slug)
        except Article.DoesNotExist:
            raise NotFound("An article with this slug does not exist")

        serializer = self.serializer_class(
            serializer_instance, context=serializer_context
        )

        return Response(serializer.data, status=status.HTTP_200_OK)


class ArticlesFavoriteAPIView(APIView):
    """view to handle favoriting articles"""

    permission_classes = (IsAuthenticated,)
    serializer_class = ArticleSerializer

    def delete(self, request, article_slug=None):
        """method to unfavorite an article"""

        profile = self.request.user.profile
        serializer_context = {"request": request}

        try:
            article = Article.objects.get(slug=article_slug)
        except Article.DoesNotExists:
            raise NotFound("Article with this slug does not exist")

        profile.unfavorite(article)

        serializer = self.serializer_class(article, context=serializer_context)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, article_slug=None):
        """method to handle favoriting an article"""

        profile = self.request.user.profile
        serializer_context = {"request": request}

        try:
            article = Article.objects.get(slug=article_slug)
        except Article.DoesNotExist:
            raise NotFound("Article with this slug does not exist")

        profile.favorite(article)

        serializer = self.serializer_class(article, context=serializer_context)

        return Response(serializer.data, status=status.HTTP_200_OK)


class CommentsListCreateAPIView(generics.ListCreateAPIView):
    """view for listing and creating and new comments"""

    lookup_field = "article__slug"
    lookup_url_kwarg = "article_slug"
    permission_classes = (IsAuthenticatedOrReadOnly,)
    # renderer_classes = (CommentJSONRenderer,)
    serializer_class = CommentSerializer
    queryset = Comment.objects.select_related(
        "article",
        "article__author",
        "article__author__user",
        "author",
        "author__user",
    )

    def filter_queryset(self, queryset):
        filters = {self.lookup_field: self.kwargs[self.lookup_url_kwarg]}

        return queryset.filter(**filters)

    def create(self, request, article_slug=None):
        data = request.data.get("comment", {})
        context = {"author": request.user.profile}

        try:
            context["article"] = Article.objects.get(slug=article_slug)
        except Article.DoesNotExist:
            raise NotFound("An article with this slug does not exist")

        serializer = self.serializer_class(data=data, context=context)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CommentsDestroyAPIView(generics.DestroyAPIView):
    """view to delete comments"""

    lookup_url_kwargs = "comment_pk"
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Comment.objects.all()

    def destroy(self, request, article_slug=None, comment_pk=None):
        """method to delete comment"""

        try:
            comment = Comment.objects.get(pk=comment_pk)
        except Comment.DoesNotExist:
            raise NotFound("A cooment with this ID does not exist")

        comment.delete()

        return Response(None, status=status.HTTP_204_NO_CONTENT)


class TagListAPIView(generics.ListAPIView):
    """responsible for viewing all tags"""

    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = (AllowAny,)
    pagination_class = None

    def list(self, request):
        serializer_data = self.get_queryset()
        serializer = self.serializer_class(serializer_data, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
