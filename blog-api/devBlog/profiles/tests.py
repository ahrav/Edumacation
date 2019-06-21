from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from .models import Profile
from authentication.models import User

# PROFILE_URL = reverse("profiles:profile-retrieve")


def get_url(username):
    return reverse("profile:profile-retrieve", args=["username"])


def create_user(**params):
    return User.objects.create_user(**params)


class RetrieveProfileApiTests(TestCase):
    """Tests for retrieving user profile"""

    def setUp(self):
        self.client = APIClient()
        self.user = create_user(
            email="test@test.com",
            username="test_username",
            password="test_password",
        )

    def retrieve_profile_authenticated(self):
        """autenticated users can retrieve profiles"""

        self.client.force_authenticate(user=self.user)
        url = get_url(self.user.username)

        res = self.client.get(url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["username"], self.user.username)

    def retrieve_profile_un_authenticated(self):
        """unauthenticated users should not be able to retrieve profiles"""

        url = get_url(self.user.username)

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)
        self.assertIn("errors", res.data)
