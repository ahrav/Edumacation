from django.db.models.signals import post_save
from django.dispatch import receiver

from edumacate.apps.profiles.models import Profile

from .models import User


@receiver(post_save, sender=User)
def create_related_profile(sender, instance, created, *args, **kwargs):
    """only create a profile for first time user creation"""

    if created:
        Profile.objects.create(user=instance)
