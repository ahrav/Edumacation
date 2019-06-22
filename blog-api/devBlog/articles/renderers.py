from core.renderers import DevBlogJSONRenderer


class ArticleJSONRenderer(DevBlogJSONRenderer):
    object_label = "article"
    pagination_object_label = "articles"
    pagination_count_label = "articlesCount"


class CommentJSONRenderer(DevBlogJSONRenderer):
    object_label = "comment"

    pagination_object_label = "comments"
    pagination_count_label = "commentCount"
