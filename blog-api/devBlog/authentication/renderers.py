from core.renderers import DevBlogJSONRenderer


class UserJSONRenderer(DevBlogJSONRenderer):
    object_level = "user"

    def render(self, data, media_type=None, render_context=None):
        """First check for authentication and wrap errors in error namespace
           Decode token key in response so it serializes properly
           before rendering the User object"""
        token = data.get("token", None)

        if token is not None and isinstance(token, bytes):
            data["token"] = token.decode("utf-8")

        return super(UserJSONRenderer, self).render(data)
