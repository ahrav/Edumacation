from rest_framework import serializers

from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    """Serializer for the Profile model"""

    username = serializers.CharField(source="user.username")
    bio = serializers.CharField(allow_blank=True, required=False)
    image = serializers.URLField(
        allow_blank=True,
        allow_null=True,
        error_messages={"invalid": "Image must be a valid URL."},
    )
    following = serializers.SerializerMethodField()
    followerCount = serializers.SerializerMethodField(
        method_name="get_follower_count"
    )

    class Meta:
        model = Profile
        fields = ("username", "bio", "image", "following", "followerCount")

    # def get_image(self, obj):
    #     """returns an image object"""
    #     if obj.image:
    #         return obj.image

    #     return "https://static.productionready.io/images/smiley-cyrus.jpg"

    def get_follower_count(self, instance):
        """return number of followers for given users"""

        return instance.follower_count()

    def get_following(self, instance):
        request = self.context.get("request", None)

        if request is None:
            return False

        if not request.user.is_authenticated:
            return False

        follower = request.user.profile
        followee = instance

        return follower.is_following(followee)
