from core.renderers import DevBlogJSONRenderer


class ArticleJSONRenderer(DevBlogJSONRenderer):
    object_label = "article"
    object_label_plural = "articles"
