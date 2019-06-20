from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient

from .models import User

CREATE_USER_URL = reverse("authentication:user-registration")
LOGIN_USER_URL = reverse("authentication:user-login")
UPDATE_USER_URL = reverse("authentication:user-update")
USER_REQUEST_DATA = {
    "email": "ahrav@go.com",
    "password": "thisisatestpass",
    "username": "test_username",
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
        self.assertTrue(user.check_password(USER_REQUEST_DATA["password"]))
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
            "email": "ahrav@go.com",
            "password": "short",
            "username": "test_username",
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


class LoginUserApiTest(TestCase):
    """Tests for logging in users"""

    def setUp(self):
        self.client = APIClient()
        self.user = create_user(
            email="ahrav@go.com",
            password="thisisatestpass",
            username="test_username",
        )

    def login(self):
        return self.client.post(
            LOGIN_USER_URL, USER_REQUEST_DATA, format="json"
        )

    def test_login_existing_users(self):
        res = self.login()

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_login_non_existing_users_fail(self):
        payload = {
            "email": "notexit@test.com",
            "username": "nousername",
            "password": "testpass",
        }

        res = self.client.post(LOGIN_USER_URL, payload, format="json")

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_token_exist_login(self):
        res = self.login()

        self.assertIn("token", res.data)

    def test_username_exist_login(self):
        res = self.login()

        self.assertIn("username", res.data)

    def test_email_exist_login(self):
        res = self.login()

        self.assertIn("email", res.data)


class UpdateUserApiTest(TestCase):
    """Tests for updating user account"""

    def setUp(self):
        self.client = APIClient()
        self.user = create_user(
            email="ahrav@go.com",
            password="thisisatestpass",
            username="test_username",
        )
        self.client.force_authenticate(user=self.user)

    def test_retrieve_user_authorized(self):
        """User can retrieve account if not authorized"""

        res = self.client.get(UPDATE_USER_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_update_user_authorized(self):
        payload = {"user": {"email": "edited@go.com"}}

        res = self.client.put(UPDATE_USER_URL, payload, format="json")

        self.user.refresh_from_db()
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(self.user.email, payload["user"]["email"])

    def test_update_no_password_in_response(self):
        """Make sure the password is not returned to the user"""

        payload = {
            "user": {"email": "edited@go.com", "password": "newpassword"}
        }

        res = self.client.put(UPDATE_USER_URL, payload, format="json")

        self.user.refresh_from_db()
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(self.user.email, payload["user"]["email"])
        self.assertTrue(self.user.check_password(payload["user"]["password"]))
        self.assertNotIn("password", res.data)
