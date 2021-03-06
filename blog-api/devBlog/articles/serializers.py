import sys
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
from rest_framework import serializers
from PIL import Image

from profiles.serializers import ProfileSerializer

from .models import Article, Comment, Tag
from .relations import TagRelatedField


class ArticleSerializer(serializers.ModelSerializer):
    """serializer for article model"""

    author = ProfileSerializer(read_only=True)
    description = serializers.CharField(required=False, allow_blank=True)
    title = serializers.CharField(
        error_messages={
            "required": "Title is required and can not be left blank",
            "blank": "Title can not be left blank",
        }
    )
    body = serializers.CharField(required=False, allow_blank=True)
    slug = serializers.SlugField(required=False)
    favorited = serializers.SerializerMethodField()
    favoritesCount = serializers.SerializerMethodField(
        method_name="get_favorites_count"
    )
    commentsCount = serializers.SerializerMethodField(
        method_name="get_comments_count"
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
            "commentsCount",
            "slug",
            "tagList",
            "title",
            "updatedAt",
            "image",
        )

    def create(self, validated_data):
        author = self.context.get("author", None)
        tags = validated_data.pop("tags", [])

        article = Article.objects.create(author=author, **validated_data)

        for tag in tags:
            article.tags.add(tag)

        return article

    def validate_image(self, image):
        """ensure image extension is valid type"""

        ext = image.name.split(".")[-1].upper()
        if ext not in ["JPG", "JPEG", "PNG"]:
            raise serializers.ValidationError(
                "Please upload correct filetype (JPG, JPEG, PNG)"
            )
        img = image.file
        resized_image = Image.open(img)
        resized_image = resized_image.resize((675, 285), Image.ANTIALIAS)
        output = BytesIO()
        resized_image.save(output, format="JPEG", quality=90)
        output.seek(0)

        return InMemoryUploadedFile(
            output,
            "ImageField",
            image.name,
            "image/jpeg",
            sys.getsizeof(output),
            None,
        )

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

    def get_comments_count(self, instance):
        """return number of comments for an article"""

        return instance.comments.count()


class CommentSerializer(serializers.ModelSerializer):
    """serializer for comments"""

    author = ProfileSerializer(read_only=True, required=False)
    createdAt = serializers.SerializerMethodField(method_name="get_created_at")
    updatedAt = serializers.SerializerMethodField(method_name="get_updated_at")
    body = serializers.CharField(
        required=True, error_messages={"blank": "Comment can not be blank."}
    )

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
        return obj["tags__tag"]
