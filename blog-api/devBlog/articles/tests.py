from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from .models import Article, Comment
from authentication.models import User

ARTICLE_URL = reverse("articles:article-list")
CREATE_ARTICLE_PAYLOAD = {
    "article": {
        "body": "test body action",
        "title": "test title",
        "description": "this is a test description",
    }
}
CREATE_COMMENT_PAYLOAD = {"comment": {"body": "test new comment"}}


def detail_article_url(slug):
    return reverse("articles:article-detail", args=[slug])


def detail_comment_url(slug):
    return reverse("articles:comment-detail", args=[slug])


def create_user(**params):
    return User.objects.create_user(**params)


def create_article(**params):
    return Article.objects.create(**params)


def create_comment(**params):
    return Comment.objects.create(**params)


class ArticleApiTests(TestCase):
    """Test for articles"""

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
        self.assertEqual(res.data["author"], self.user.id)

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

        url = detail_article_url(self.article.slug)
        res = self.client.put(url, payload, format="json")

        self.article.refresh_from_db()
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["body"], payload["article"]["body"])

    def test_update_article_un_authorized(self):
        """Unauthorized users should not be able to update articles"""

        payload = {"article": {"body": "updated body"}}

        url = detail_article_url(self.article.slug)
        res = self.client.put(url, payload, format="json")

        self.article.refresh_from_db()
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_article_not_exist(self):
        """Should not be able to update a non existing article"""

        self.client.force_authenticate(user=self.user)
        payload = {"article": {"body": "updated body"}}

        url = detail_article_url("wrong_slug")
        res = self.client.put(url, payload, format="json")

        self.assertIn("errors", res.data)
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)


class CommentApiTests(TestCase):
    """Test ability to create comments for articles"""

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
        self.comment1 = create_comment(
            body="comment1", article=self.article, author=self.user.profile
        )
        self.comment2 = create_comment(
            body="comment2", article=self.article, author=self.user.profile
        )

    def test_create_comment_authorized(self):
        """only authenticated users should be able to create comments"""

        self.client.force_authenticate(user=self.user)

        url = detail_comment_url(self.article.slug)
        res = self.client.post(url, CREATE_COMMENT_PAYLOAD, format="json")

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data["author"]["username"], self.user.username)
        self.assertEqual(
            res.data["body"], CREATE_COMMENT_PAYLOAD["comment"]["body"]
        )

    def test_create_comment_un_authorized(self):
        """unauthorized users should not be able to create comments"""

        url = detail_comment_url(self.article.slug)
        res = self.client.post(url, CREATE_COMMENT_PAYLOAD, format="json")

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_cant_create_empty_comments(self):
        """ensure comments with no body are not allowed"""

        self.client.force_authenticate(user=self.user)

        url = detail_comment_url(self.article.slug)
        res = self.client.post(url, {}, format="json")

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_retrieve_comments_for_article(self):
        """return list of comments for article"""

        url = detail_comment_url(self.article.slug)

        res = self.client.get(url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIsInstance(res.data, list)
        self.assertEqual(len(res.data), 2)
