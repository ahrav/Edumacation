from rest_framework import serializers

from profiles.serializers import ProfileSerializer

from .models import Article, Comment, Tag
from .relations import TagRelatedField


class ArticleSerializer(serializers.ModelSerializer):
    """serializer for article model"""

    author = ProfileSerializer(read_only=True)
    description = serializers.CharField(required=False)
    slug = serializers.SlugField(required=False)
    favorited = serializers.SerializerMethodField()
    favoritesCount = serializers.SerializerMethodField(
        method_name="get_favorites_count"
    )
    tagList = TagRelatedField(many=True, required=False, source="tags")
    createdAt = serializers.SerializerMethodField(method_name="get_created_at")
    updatedAt = serializers.SerializerMethodField(method_name="get_updated_at")

    class Meta:
        model = Article
        fields = (
            "author",
            "body",
            "createdAt",
            "description",
            "favorited",
            "favoritesCount",
            "slug",
            "tagList",
            "title",
            "updatedAt",
        )

    def create(self, validated_data):
        author = self.context.get("author", None)
        tags = validated_data.pop("tags", [])

        article = Article.objects.create(author=author, **validated_data)

        for tag in tags:
            article.tags.add(tag)

        return article

    def get_created_at(self, instance):
        return instance.created_at.isoformat()

    def get_updated_at(self, instance):
        return instance.updated_at.isoformat()

    def get_favorited(self, instance):
        """return True if article is favorited by user"""
        request = self.context.get("request", None)

        if not request:
            return False

        if not request.user.is_authenticated:
            return False

        return request.user.profile.has_favorited(instance)

    def get_favorites_count(self, instance):
        """return number of times an article has been favorited"""

        return instance.favorited_by.count()


class CommentSerializer(serializers.ModelSerializer):
    """serializer for comments"""

    author = ProfileSerializer(read_only=True, required=False)
    createdAt = serializers.SerializerMethodField(method_name="get_created_at")
    updatedAt = serializers.SerializerMethodField(method_name="get_updated_at")

    class Meta:
        model = Comment
        fields = ("id", "author", "body", "createdAt", "updatedAt")

    def create(self, validated_data):
        article = self.context["article"]
        author = self.context["author"]

        return Comment.objects.create(
            author=author, article=article, **validated_data
        )

    def get_created_at(self, instance):
        return instance.created_at.isoformat()

    def get_updated_at(self, instance):
        return instance.updated_at.isoformat()


class TagSerializer(serializers.ModelSerializer):
    """serializes tag objects"""

    class Meta:
        model = Tag
        fields = ("tag",)

    def to_representation(self, obj):
        return obj.tag
