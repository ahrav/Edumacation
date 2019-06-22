from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from authentication.models import User

from .models import Article, Comment, Tag

ARTICLE_URL = reverse("articles:article-list")
TAGS_URL = reverse('articles:tag-list')
FEED_URL = reverse('articles:article-feed')
CREATE_ARTICLE_PAYLOAD = {
    "article": {
        "body": "test body action",
        "title": "test title",
        "description": "this is a test description",
    }
}
CREATE_COMMENT_PAYLOAD = {"comment": {"body": "test new comment"}}


def get_detail_article_url(slug):
    return reverse("articles:article-detail", args=[slug])


def get_detail_comment_url(slug):
    return reverse("articles:comment-detail", args=[slug])


def get_detail_comment_delete_url(slug, comment_pk):
    return reverse("articles:comment-delete", args=[slug, comment_pk])


def get_favorite_article_url(slug):
    return reverse("articles:article-favorite", args=[slug])


def get_profile_follow_url(username):
    return reverse("profiles:profile-follow", args=[username])


def create_user(**params):
    return User.objects.create_user(**params)


def create_article(**params):
    return Article.objects.create(**params)


def create_comment(**params):
    return Comment.objects.create(**params)


def create_tag(**params):
    return Tag.objects.create(**params)


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
        self.article2 = create_article(
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
        self.assertEqual(len(res.data['results']), 2)
        self.assertIsInstance(res.data['results'], list)

    def test_update_article(self):
        """user should be able to update article"""
        self.client.force_authenticate(user=self.user)

        payload = {"article": {"body": "updated body"}}

        url = get_detail_article_url(self.article.slug)
        res = self.client.put(url, payload, format="json")

        self.article.refresh_from_db()
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["body"], payload["article"]["body"])

    def test_update_article_un_authorized(self):
        """Unauthorized users should not be able to update articles"""

        payload = {"article": {"body": "updated body"}}

        url = get_detail_article_url(self.article.slug)
        res = self.client.put(url, payload, format="json")

        self.article.refresh_from_db()
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_article_not_exist(self):
        """Should not be able to update a non existing article"""

        self.client.force_authenticate(user=self.user)
        payload = {"article": {"body": "updated body"}}

        url = get_detail_article_url("wrong_slug")
        res = self.client.put(url, payload, format="json")

        self.assertIn("errors", res.data)
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_favorite_article_authenticated(self):
        """authenticated users can favorite an article"""

        self.client.force_authenticate(user=self.user)

        url = get_favorite_article_url(self.article.slug)
        res = self.client.post(url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertTrue(res.data["favorited"])
        self.assertEqual(res.data["slug"], self.article.slug)
        self.assertEqual(res.data["favoritesCount"], 1)

    def test_favorite_article_un_authenticated(self):
        """unauthenticated users should not be able to favorite articles"""

        url = get_favorite_article_url(self.article.slug)
        res = self.client.post(url)

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)
        self.assertFalse(self.article.author.has_favorited(self.article))

    def test_un_favorite_article_authenticated(self):
        """authenticated user should be able to unfavorite
        and article if already favorited"""

        self.client.force_authenticate(user=self.user)
        self.article.author.favorite(self.article)

        url = get_favorite_article_url(self.article.slug)
        res = self.client.delete(url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["favoritesCount"], 0)
        self.assertFalse(res.data["favorited"])
        self.assertEqual(res.data["slug"], self.article.slug)

    def test_un_favorite_article_un_authenticated(self):
        """unauthenticated user should not be able to unfavorite articles"""

        self.article.author.favorite(self.article)
        url = get_favorite_article_url(self.article.slug)
        res = self.client.delete(url)

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_add_tags_to_article_authenticated(self):
        """authenticated users should be able to add tags to articles"""

        self.client.force_authenticate(user=self.user)
        tag1 = create_tag(tag="test_tag1", slug="test-slug1")
        tag2 = create_tag(tag="test_tag2", slug="test-slug2")
        self.article2.tags.add(tag1)
        self.article2.tags.add(tag2)

        url = get_detail_article_url(self.article2.slug)
        res = self.client.get(url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data["tagList"]), 2)
        self.assertIn("test_tag1", res.data["tagList"])

    def test_create_article_with_tags(self):
        """create and article and attach a list of tags"""

        self.client.force_authenticate(user=self.user)

        payload = {
            "article": {
                "title": "test title",
                "description": "test description",
                "body": "test body",
                "tagList": ["test1", "test2"],
            }
        }

        res = self.client.post(ARTICLE_URL, payload, format='json')

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(len(res.data['tagList']), 2)
        self.assertEqual(res.data['title'], payload['article']['title'])
        self.assertIn(payload['article']['tagList'][0], res.data['tagList'])

    def test_add_tags_to_article_un_authenticated(self):
        """unauthenticated users should not be able to tag articles"""

        payload = {
            "article": {
                "title": "test title",
                "description": "test description",
                "body": "test body",
                "tagList": ["test1", "test2"],
            }
        }

        res = self.client.post(ARTICLE_URL, payload, format="json")

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_articles_are_paginated(self):
        """articles should be returuned in a paginated format"""

        res = self.client.get(ARTICLE_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIsInstance(res.data['results'], list)
        self.assertIn('count', res.data)

    def test_view_feed_authenticated(self):
        """authenticated users that are following
           others with published articles should
           be able to view those articles in their feed."""

        self.client.force_authenticate(user=self.user)
        self.followee = create_user(
            email="followee@test.com",
            username="followee_user",
            password="test_followee")
        self.followee_article = create_article(
            body="followee body",
            title="test followee title",
            description="test followee description",
            author=self.followee.profile,
            slug="test-followee")

        url = get_profile_follow_url(self.followee.username)
        self.client.post(url)

        result = self.client.get(FEED_URL)

        self.assertEqual(result.status_code, status.HTTP_200_OK)
        self.assertEqual(len(result.data['results']), 1)
        self.assertEqual(result.data['results'][0]['author'], self.followee.id)

    def test_view_feed_un_authenticated(self):
        """unauthenticated users should not be
           able to view articles of users they follow"""

        self.followee = create_user(
            email="followee@test.com",
            username="followee_user",
            password="test_followee")
        self.followee_article = create_article(
            body="followee body",
            title="test followee title",
            description="test followee description",
            author=self.followee.profile,
            slug="test-followee")

        url = get_profile_follow_url(self.followee.username)
        self.client.post(url)

        result = self.client.get(FEED_URL)

        self.assertEqual(result.status_code, status.HTTP_403_FORBIDDEN)

    def test_articles_filtered_by_author(self):
        """retrieve list of articles filtered by the author given"""

        self.article3 = create_article(
            body="test body 3",
            title="test title 3",
            description="test description 3",
            author=self.user.profile,
            slug="test-slug-3",
        )

        url = f"{ARTICLE_URL}?author={self.user.username}"
        res = self.client.get(url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data['results']), 3)
        for article in res.data['results']:
            self.assertEqual(article['author'], self.user.id)

    def test_favorited_articles_by_username_filter(self):
        """retrieve list of favorited articles based on username provided"""

        self.client.force_authenticate(user=self.user)

        article_url = get_favorite_article_url(self.article.slug)
        res = self.client.post(article_url)

        filter_url = f"{ARTICLE_URL}?favorited={self.user.username}"
        res = self.client.get(filter_url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['results'][0]['slug'], self.article.slug)
        self.assertEqual(len(res.data['results']), 1)

    def test_articles_filtered_by_tags(self):
        """retrieve list of articles filtered by their tag """

        self.client.force_authenticate(user=self.user)
        tag1 = create_tag(tag="test_tag1", slug="test-slug1")
        tag2 = create_tag(tag="test_tag2", slug="test-slug2")
        self.article2.tags.add(tag1)
        self.article.tags.add(tag2)

        url = f"{ARTICLE_URL}?tag={tag1.tag}"
        res = self.client.get(url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data['results']), 1)
        self.assertEqual(res.data['results'][0]['slug'], self.article2.slug)


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

        url = get_detail_comment_url(self.article.slug)
        res = self.client.post(url, CREATE_COMMENT_PAYLOAD, format="json")

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data["author"]["username"], self.user.username)
        self.assertEqual(
            res.data["body"], CREATE_COMMENT_PAYLOAD["comment"]["body"]
        )

    def test_create_comment_un_authorized(self):
        """unauthorized users should not be able to create comments"""

        url = get_detail_comment_url(self.article.slug)
        res = self.client.post(url, CREATE_COMMENT_PAYLOAD, format="json")

        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_cant_create_empty_comments(self):
        """ensure comments with no body are not allowed"""

        self.client.force_authenticate(user=self.user)

        url = get_detail_comment_url(self.article.slug)
        res = self.client.post(url, {}, format="json")

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_retrieve_comments_for_article(self):
        """return list of comments for article"""

        url = get_detail_comment_url(self.article.slug)

        res = self.client.get(url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIsInstance(res.data['results'], list)
        self.assertEqual(len(res.data['results']), 2)

    def test_delete_comment_authorized(self):
        """authorized users should be able to delete comments"""

        self.client.force_authenticate(user=self.user)
        url = get_detail_comment_delete_url(self.article.slug, self.comment1.id)

        res = self.client.delete(url)

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertIsNone(res.data)
        self.article.refresh_from_db()
        self.assertEqual(len(self.article.comments.all()), 1)
        self.assertEqual(
            self.article.comments.first().body, self.comment2.body
        )


class TagApiTests(TestCase):
    """Tests for tags"""

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
        tag1 = create_tag(tag="test_tag1", slug="test-slug1")
        tag2 = create_tag(tag="test_tag2", slug="test-slug2")

        self.article.tags.add(tag1)
        self.article.tags.add(tag2)

    def test_list_of_tags_authenticated(self):
        """authenticated users should be able to
           view list of all tags created"""

        self.client.force_authenticate(user=self.user)

        res = self.client.get(TAGS_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 2)
        self.assertIn('test_tag1', res.data)

    def test_list_of_tags_un_authenticated(self):
        """unauthenticated users should also
           be able to view list of all tags"""

        res = self.client.get(TAGS_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 2)
        self.assertIn('test_tag1', res.data)
