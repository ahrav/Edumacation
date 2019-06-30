from django.db import models

from authentication.models import User
from core.models import TimestampModel


class Profile(TimestampModel):
    """Define the profile class"""

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    image = models.URLField(blank=True, null=True)
    follows = models.ManyToManyField(
        "self", related_name="followed_by", symmetrical=False
    )
    favorites = models.ManyToManyField(
        "articles.Article", related_name="favorited_by"
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
        """return true if if another profile
           is following us, false otherwise"""

        return self.followed_by.filter(pk=profile.pk).exists()

    def favorite(self, article):
        """favorite an article if not already favorited"""

        self.favorites.add(article)

    def unfavorite(self, article):
        """un-favorite an article if already favorited"""

        self.favorites.remove(article)

    def has_favorited(self, article):
        """return true if user has favorited an article, else returns false"""

        return self.favorites.filter(pk=article.pk).exists()
