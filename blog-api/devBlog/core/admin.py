from django.contrib import admin

from authentication.models import User
from profiles.models import Profile
from articles.models import Article, Comment, Tag


@admin.register(User)
class UserAdmin(admin.ModelAdmin):

    list_display = ("username", "email")


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):

    list_display = ("user", "bio")


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):

    list_display = ("title", "author", "description")


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):

    list_display = ("body", "article", "author")


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):

    list_display = ("tag", "slug")

