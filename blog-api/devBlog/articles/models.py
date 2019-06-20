from django.db import models

from core.models import TimestampModel
from profiles.models import Profile


class Article(TimestampModel):
    """Articles related to users"""

    slug = models.SlugField(db_index=True, max_length=255, unique=True)
    title = models.CharField(db_index=True, max_length=255)
    description = models.TextField()
    body = models.TextField()
    author = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name="articles"
    )

    def __str__(self):
        return self.title
