from datetime import datetime, timedelta

import jwt
from django.conf import settings
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.db import models

from edumacate.apps.core.models import TimestampModel


class UserManager(BaseUserManager):
    """
    Django requires that custom users define their own Manager class. By
    inheriting from `BaseUserManager`, we get a lot of the same code used by
    Django to create a User.

    All we have to do is override the `create_user` function which we will use
    to create `User` objects.
    """

    def create_user(self, username, email, password=None):
        """Create and return a User with an email, username and password"""
        if username is None:
            raise TypeError("Users must have a username")
        if email is None:
            raise TypeError("Users must have an email address")

        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email, password):
        """ Create and return a User with superuser (admin) admin permissions"""

        if password is None:
            raise TypeError("Superusers must have a password")

        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class User(AbstractBaseUser, PermissionsMixin, TimestampModel):
    """ User model class"""

    username = models.CharField(db_index=True, max_length=255, unique=True)
    email = models.EmailField(db_index=True, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = UserManager()

    def __str__(self):
        """ Return string representation of User instance"""
        return self.email

    @property
    def token(self):
        """ Allow to get user token by calling user.token"""
        return self._generate_jwt_token()

    def get_full_name(self):
        """ Required by Django we will return username"""
        return self.username

    def get_short_name(self):
        """ Return username, field required by Django"""
        return self.username

    def _generate_jwt_token(self):
        """ Generate JWT store user ID and empty expiration
        date set to 60 days in the future"""
        dt = datetime.now() + timedelta(days=60)

        token = jwt.encode(
            {"id": self.pk, "exp": int(dt.strftime("%s"))},
            settings.SECRET_KEY,
            algorithm="HS256",
        )

        return token.decode("utf-8")
