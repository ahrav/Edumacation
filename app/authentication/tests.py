from django.test import TestCase
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

from .models import User

CREATE_USER_URL = reverse("authentication:user-registration")


USER_REQUEST_DATA = {
    "user": {
        "email": "ahrav@go.com",
        "password": "thisisatestpass",
        "username": "test_username",
    }
}


def create_user(**params):
    return User.objects.create_user(**params)


class RegisterUserApiTests(TestCase):
    """Tests for user registration"""

    def setUp(self):
        self.client = APIClient()

    def test_create_valid_user_success(self):
        """Test creating user with valid payload is successful"""

        res = self.client.post(
            CREATE_USER_URL, USER_REQUEST_DATA, format="json"
        )

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        user = User.objects.get(username=res.data["username"])
        self.assertTrue(
            user.check_password(USER_REQUEST_DATA["user"]["password"])
        )
        self.assertNotIn("password", res.data)

    def test_user_exists(self):
        """Test that creating an existing user fails"""
        payload = {
            "email": "ahrav@go.com",
            "password": "thisisatestpass",
            "username": "test_username",
        }

        create_user(**payload)

        res = self.client.post(CREATE_USER_URL, payload, format="json")

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_password_too_short(self):
        """Test to make sure password is longer than 8 characters"""
        payload = {
            "user": {
                "email": "ahrav@go.com",
                "password": "short",
                "username": "test_username",
            }
        }

        res = self.client.post(CREATE_USER_URL, payload, format="json")

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_token_exists(self):
        """Ensure token is in respone during user creation"""

        res = self.client.post(
            CREATE_USER_URL, USER_REQUEST_DATA, format="json"
        )

        self.assertIn("token", res.data)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
