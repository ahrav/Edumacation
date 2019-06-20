from django.db import models


class TimestampModel(models.Model):
    """Model to represent the timestamps on all other model classes"""

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

        ordering = ["-created_at", "-updated_at"]
