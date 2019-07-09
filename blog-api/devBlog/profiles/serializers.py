import re
from rest_framework import serializers

from .models import Profile

regex = re.compile(
    r"^(?:http|ftp)s?://"  # http:// or https://
    r"(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|"  # domain...
    r"localhost|"  # localhost...
    r"\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"  # ...or ip
    r"(?::\d+)?"  # optional port
    r"(?:/?|[/?]\S+)$",
    re.IGNORECASE,
)


class ProfileSerializer(serializers.ModelSerializer):
    """Serializer for the Profile model"""

    username = serializers.CharField(source="user.username")
    bio = serializers.CharField(allow_blank=True, required=False)
    image = serializers.CharField(
        allow_blank=True,
        max_length=400,
        allow_null=True,
        error_messages={"invalid": "Image must be a valid URL."},
    )
    following = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ("username", "bio", "image", "following")

    def validate_image(self, image):
        if not re.match(regex, image):
            raise serializers.ValidationError(
                "Please enter valid url for the image"
            )

    # def get_image(self, obj):
    #     """returns an image object"""
    #     if obj.image:
    #         return obj.image

    #     return "https://static.productionready.io/images/smiley-cyrus.jpg"

    def get_following(self, instance):
        request = self.context.get("request", None)

        if request is None:
            return False

        if not request.user.is_authenticated:
            return False

        follower = request.user.profile
        followee = instance

        return follower.is_following(followee)
