from core.renderers import DevBlogJSONRenderer


class ProfileJSONRenderer(DevBlogJSONRenderer):
    object_label = "profile"
    pagination_object_label = "profiles"
    pagination_count_label = "profilesCount"

