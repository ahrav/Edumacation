from django.db import models

from edumacate.apps.authentication.models import User
from edumacate.apps.core.models import TimestampModel


class Profile(TimestampModel):
    """Define the profile class"""

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    image = models.URLField(blank=True)

    def __str__(self):
        return self.user.username
