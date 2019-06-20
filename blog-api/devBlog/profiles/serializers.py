from rest_framework import serializers

from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    """Serializer for the Profile model"""

    username = serializers.CharField(source="user.username")
    bio = serializers.CharField(allow_blank=True, required=False)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ("username", "bio", "image")
        read_only_fields = ("username",)

    def get_image(self, obj):
        """returns an image object"""

        if obj.image:
            return obj.image

        return "https://static.productionready.io/images/smiley-cyrus.jpg"
