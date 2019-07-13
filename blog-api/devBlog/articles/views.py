from django.db.models import Count

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
from .permissions import IsOwnerOrReadOnly

# from .renderers import ArticleJSONRenderer, CommentJSONRenderer
from .serializers import ArticleSerializer, CommentSerializer, TagSerializer


class ArticleViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    """View for creating articles"""

    queryset = Article.objects.select_related("author", "author__user")
    permission_classes = (IsOwnerOrReadOnly, IsAuthenticatedOrReadOnly)
    serializer_class = ArticleSerializer
    # renderer_classes = (ArticleJSONRenderer,)
    lookup_field = "slug"

    def get_queryset(self):
        queryset = self.queryset

        author = self.request.query_params.get("author", None)
        if author:
            queryset = queryset.filter(author__user__username=author)

        tag = self.request.query_params.get("tag", None)
        if tag:
            queryset = queryset.filter(tags__tag=tag)

        favorited_by = self.request.query_params.get("favorited", None)
        if favorited_by:
            queryset = queryset.filter(
                favorited_by__user__username=favorited_by
            )

        return queryset

    def create(self, request):
        """method to create new articles"""

        serializer_context = {
            "author": request.user.profile,
            "request": request,
        }
        serializer_data = request.data
        serializer = self.serializer_class(
            data=serializer_data, context=serializer_context
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request):
        """method to return all articles"""

        serializer_context = {"request": request}
        page = self.paginate_queryset(self.get_queryset())

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
        except Article.DoesNotExist:
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


class ArticlesFeedAPIView(generics.ListAPIView):
    """view to allow user to see all
       articles created by other user they follow"""

    permission_classes = (IsAuthenticated,)
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def get_queryset(self):
        return Article.objects.filter(
            author__in=self.request.user.profile.follows.all()
        )

    def list(self, request):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)

        serializer_context = {"request": request}
        serializer = self.serializer_class(
            page, context=serializer_context, many=True
        )

        return self.get_paginated_response(serializer.data)


class ArticlesPopularFavoritesAPIView(generics.ListAPIView):
    """view to return list of most popular articles based on favoritesCount"""

    permission_classes = (AllowAny,)
    serializer_class = ArticleSerializer
    queryset = Article.objects.annotate(
        favorite_count=Count("favorited_by")
    ).order_by("-favorite_count")[:5]

    def list(self, request):

        serializer_context = {"request": request}
        page = self.paginate_queryset(self.get_queryset())
        serializer = self.serializer_class(
            page, context=serializer_context, many=True
        )

        return self.get_paginated_response(serializer.data)


class ArticlesPopularCommentsAPIView(generics.ListAPIView):
    """view to return list of most popular articles based on number of comments per article"""

    permission_classes = (AllowAny,)
    serializer_class = ArticleSerializer
    queryset = Article.objects.annotate(
        comments_count=Count("comments")
    ).order_by("-comments_count")[:5]

    def list(self, request):

        serializer_context = {"request": request}
        page = self.paginate_queryset(self.get_queryset())
        serializer = self.serializer_class(
            page, context=serializer_context, many=True
        )

        return self.get_paginated_response(serializer.data)


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
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def destroy(self, request, article_slug=None, comment_pk=None):
        """method to delete comment"""

        try:
            comment = Comment.objects.get(pk=comment_pk)
            self.check_object_permissions(self.request, comment)
        except Comment.DoesNotExist:
            raise NotFound("A comment with this ID does not exist")

        comment.delete()

        return Response(None, status=status.HTTP_204_NO_CONTENT)


class TagListAPIView(generics.ListAPIView):
    """responsible for viewing all tags"""

    queryset = (
        Article.objects.values("tags__tag")
        .annotate(tag_count=Count("tags__tag"))
        .order_by("-tag_count")[:12]
    )
    serializer_class = TagSerializer
    permission_classes = (AllowAny,)
    pagination_class = None

    def list(self, request):
        serializer_data = self.get_queryset()
        serializer = self.serializer_class(serializer_data, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
