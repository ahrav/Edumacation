from django.db import models

from authentication.models import User
from core.models import TimestampModel


class Profile(TimestampModel):
    """Define the profile class"""

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    image = models.URLField(blank=True)
    follows = models.ManyToManyField(
        "self", related_name="followed_by", symmetrical=False
    )

    def __str__(self):
        return self.user.username

    def follow(self, profile):
        """only follow profile if not already following"""

        self.follows.add(profile)

    def unfollow(self, profile):
        """unfollow profile if only already following"""

        self.follows.remove(profile)

    def is_following(self, profile):
        """return true if user is following another profile, false otherwise"""

        return self.follows.filter(pk=profile.pk).exists()

    def is_followed(self, profile):
        """return true if if another profile is following us, false otherwise"""

        return self.followed_by.filter(pk=profile.pk).exists()
