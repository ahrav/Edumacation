import json

from rest_framework.renderers import JSONRenderer


class UserJSONRenderer(JSONRenderer):
    charset = "utf-8"

    def render(self, data, media_type=None, render_context=None):
        """First check for authentication and wrap errors in error namespace
           Decode token key in response so it serializes properly
           before rendering the User object"""
        errors = data.get("errors", None)
        token = data.get("token", None)

        if errors is not None:
            return super(UserJSONRenderer, self).render(data)

        if token is not None and isinstance(token, bytes):
            data["token"] = token.decode("utf-8")

        return json.dumps({"user": data})
