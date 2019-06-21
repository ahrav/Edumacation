from core.renderers import DevBlogJSONRenderer


class ArticleJSONRenderer(DevBlogJSONRenderer):
    object_label = "article"
    object_label_plural = "articles"


class CommentJSONRenderer(DevBlogJSONRenderer):
    object_label = "comment"
    object_label_plural = "comments"

