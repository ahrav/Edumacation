from rest_framework import serializers

from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    """Serializer for the Profile model"""

    username = serializers.CharField(source="user.username")
    bio = serializers.CharField(allow_blank=True, required=False)
    image = serializers.CharField(allow_blank=True)
    following = serializers.SerializerMethodField()
    followerCount = serializers.SerializerMethodField(
        method_name="get_follower_count"
    )

    class Meta:
        model = Profile
        fields = ("username", "bio", "image", "following", "followerCount")
        extra_kwargs = {"image": {"read_only": False}}

    # def get_image(self, obj):
    #     """returns an image object"""
    #     if obj.image:
    #         return obj.image

    #     return "https://www.carrollsirishgifts.com/media/catalog/product/cache/11/image/9df78eab33525d08d6e5fb8d27136e95/c/1/c102324.jpg"

    # def update(self, instance, validated_data):

    #     for (key, value) in validated_data.items():
    #         setattr(instance, key, value)

    #     instance.save()
    #     return instance

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
