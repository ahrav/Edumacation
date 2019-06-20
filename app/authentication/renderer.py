import json

from rest_framework.renderers import JSONRenderer


class UserJSONRenderer(JSONRenderer):
    charset = "utf-8"

    def render(self, data, media_type=None, render_context=None):
        """Decode token key in response so it serializes properly
           before rendering the User object"""
        token = data.get("token", None)

        if token and isinstance(token, bytes):
            data["token"] = token.decode("utf-8")

        return json.dumps({"user": data})

