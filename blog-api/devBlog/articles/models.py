from django.db import models
from django_extensions.db.fields import AutoSlugField

from core.models import TimestampModel
from profiles.models import Profile


def article_image_name(instance, filename):
    """Change name of file to be author's username"""
    ext = filename.split(".")[-1]
    filename = (
        f"{instance.author.user.username}-{instance.author.user_id}.{ext}"
    )

    return filename


class Article(TimestampModel):
    """Articles related to users"""

    slug = AutoSlugField(
        populate_from=["title"], db_index=True, max_length=255, unique=True
    )
    title = models.CharField(db_index=True, max_length=255)
    description = models.TextField(blank=True)
    body = models.TextField(blank=True)
    author = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name="articles"
    )
    tags = models.ManyToManyField("Tag", related_name="articles")
    image = models.ImageField(blank=True, upload_to=article_image_name)

    def __str__(self):
        return self.title


class Comment(TimestampModel):
    """Comments related to articles"""

    body = models.TextField()
    article = models.ForeignKey(
        Article, related_name="comments", on_delete=models.CASCADE
    )
    author = models.ForeignKey(
        Profile, related_name="comments", on_delete=models.CASCADE
    )


class Tag(TimestampModel):
    """Tags related to articles"""

    tag = models.CharField(max_length=255)
    slug = models.SlugField(db_index=True, unique=True)

    def __str__(self):
        return self.tag
