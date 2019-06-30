from rest_framework import serializers

from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    """Serializer for the Profile model"""

    username = serializers.CharField(source="user.username")
    bio = serializers.CharField(allow_blank=True, required=False)
    image = serializers.URLField(allow_blank=True, required=False)
    following = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ("username", "bio", "image", "following")

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
