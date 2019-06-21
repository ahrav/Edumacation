from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token

from .models import Article
from authentication.models import User

ARTICLE_URL = reverse("articles:article-list")
CREATE_ARTICLE_PAYLOAD = {
    "article": {
        "body": "test body action",
        "title": "test title",
        "description": "this is a test description",
    }
}


def detail_url(slug):
    return reverse("articles:article-detail", args=[slug])


def create_user(**params):
    return User.objects.create_user(**params)


def create_article(**params):
    return Article.objects.create(**params)


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
            ARTICLE_URL, CREATE_ARTICLE_PAYLOAD, format="json"
        )

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_article_authorized(self):
        """Authorized users should be able to create articles"""

        self.client.force_authenticate(user=self.user)

        res = self.client.post(
            ARTICLE_URL, CREATE_ARTICLE_PAYLOAD, format="json"
        )

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(
            res.data["body"], CREATE_ARTICLE_PAYLOAD["article"]["body"]
        )

    def test_create_article_correct_author(self):
        """Ensure when article is created correct
           author username is in response"""

        self.client.force_authenticate(user=self.user)

        res = self.client.post(
            ARTICLE_URL, CREATE_ARTICLE_PAYLOAD, format="json"
        )

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data["author"]["username"], self.user.username)


class RetrieveArticleApiTests(TestCase):
    """Test retrieving articles for users"""

    def setUp(self):
        self.client = APIClient()
        self.user = create_user(
            email="test@test.com", username="test_user", password="test_pass"
        )
        self.article = create_article(
            body="test body",
            title="test title",
            description="test description",
            author=self.user.profile,
            slug="test-slug",
        )
        self.article = create_article(
            body="test body 2",
            title="test title 2",
            description="test description 2",
            author=self.user.profile,
            slug="test-slug-2",
        )

    def test_retrieve_all_articles_authenticated(self):
        """user should be return list of articles"""

        res = self.client.get(ARTICLE_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 2)
        self.assertIsInstance(res.data, list)

    def test_update_article(self):
        """user should be able to update article"""
        self.client.force_authenticate(user=self.user)

        payload = {"article": {"body": "updated body"}}

        url = detail_url(self.article.slug)
        res = self.client.put(url, payload, format="json")

        self.article.refresh_from_db()
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["body"], payload["article"]["body"])

    def test_update_article_un_authorized(self):
        """Unauthorized users should not be able to update articles"""

        payload = {"article": {"body": "updated body"}}

        url = detail_url(self.article.slug)
        res = self.client.put(url, payload, format="json")

        self.article.refresh_from_db()
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_article_not_exist(self):
        """Should not be able to update a non existing article"""

        self.client.force_authenticate(user=self.user)
        payload = {"article": {"body": "updated body"}}

        url = detail_url("wrong_slug")
        res = self.client.put(url, payload, format="json")

        self.assertIn("errors", res.data)
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)
