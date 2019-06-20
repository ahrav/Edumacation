from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token

from .models import Article
from authentication.models import User

CREATE_ARTICLE_URL = reverse("articles:article-list")
CREATE_ARTICLE_PAYLOAD = {
    "article": {
        "body": "test body action",
        "title": "test title",
        "description": "this is a test description",
    }
}


def create_user(**params):
    return User.objects.create_user(**params)


class CreateArticleApiTests(TestCase):
    """Test creation of articles"""

    def setUp(self):
        self.client = APIClient()
        self.user = create_user(
            email="test@test.com",
            username="test_username",
            password="test_password",
        )

    def test_create_article_unauthorized(self):
        """Unauthorized users should not be able to create articles"""

        self.client.credentials(HTTP_AUTHORIZATION="Token " + "faketoken")

        res = self.client.post(
            CREATE_ARTICLE_URL, CREATE_ARTICLE_PAYLOAD, format="json"
        )

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_article_authorized(self):
        """Authorized users should be able to create articles"""

        self.client.force_authenticate(user=self.user)

        res = self.client.post(
            CREATE_ARTICLE_URL, CREATE_ARTICLE_PAYLOAD, format="json"
        )

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(
            res.data["body"], CREATE_ARTICLE_PAYLOAD["article"]["body"]
        )

    def test_create_article_correct_author(self):
        """Ensure when article is created correct
           author username is in response"""

        pass

