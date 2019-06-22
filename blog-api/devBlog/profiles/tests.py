from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from authentication.models import User

# PROFILE_URL = reverse("profiles:profile-retrieve")


def get_profile_url(username):
    return reverse("profiles:profile-detail", args=[username])


def get_profile_follow_url(username):
    return reverse("profiles:profile-follow", args=[username])


def create_user(**params):
    return User.objects.create_user(**params)


class ProfileApiTests(TestCase):
    """Tests for retrieving user profile"""

    def setUp(self):
        self.client = APIClient()
        self.user = create_user(
            email="test@test.com",
            username="test_username",
            password="test_password",
        )
        self.followee = create_user(
            email="followee@test.com",
            username="followeeuser",
            password="testfollowee",
        )

    def test_retrieve_profile_authenticated(self):
        """authenticated users can retrieve profiles"""

        self.client.force_authenticate(user=self.user)
        url = get_profile_url(self.user.username)

        res = self.client.get(url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["username"], self.user.username)

    def test_retrieve_profile_un_authenticated(self):
        """unauthenticated users should not be able to retrieve profiles"""

        url = get_profile_url(self.user.username)

        res = self.client.get(url)

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_follow_profile_authenticated(self):
        """authenticated user should be able to follow another profile"""

        self.client.force_authenticate(user=self.user)

        url = get_profile_follow_url(self.followee.username)

        res = self.client.post(url)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data["username"], self.followee.username)
        self.assertTrue(res.data["following"])

    def test_follow_profile_un_authenticated(self):
        """unauthenticated user can not follow another profile"""

        url = get_profile_follow_url(self.followee.username)

        res = self.client.post(url)

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_un_follow_profile_authenticated(self):
        """authenticated users should be able to un-follow profiles"""

        self.client.force_authenticate(user=self.user)

        url = get_profile_follow_url(self.followee.username)

        res = self.client.delete(url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertFalse(res.data["following"])
        self.assertEqual(res.data["username"], self.followee.username)

    def test_un_follow_profile_un_authenticated(self):
        """unauthenticated users should not be able to un-follow profiles"""

        url = get_profile_follow_url(self.followee.username)

        res = self.client.delete(url)

        self.assertTrue(res.status_code, status.HTTP_403_FORBIDDEN)
