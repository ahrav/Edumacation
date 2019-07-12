import re
from django.contrib.auth import authenticate
from rest_framework import serializers

from profiles.serializers import ProfileSerializer

from .models import User


regex = re.compile(
    r"^(?:http|ftp)s?://"  # http:// or https://
    r"(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|"  # domain...
    r"localhost|"  # localhost...
    r"\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"  # ...or ip
    r"(?::\d+)?"  # optional port
    r"(?:/?|[/?]\S+)$",
    re.IGNORECASE,
)


class RegistrationSerializer(serializers.ModelSerializer):
    """Serializes registration requests and creates a new user"""

    password = serializers.CharField(
        write_only=True,
        min_length=8,
        error_messages={
            "min_length": "Password must be at least 8 characters."
        },
        style={"input_type": "password"},
        trim_whitespace=False,
    )
    token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        fields = ["email", "username", "password", "token"]

    def create(self, validated_data):
        """Utilize custom create_user method"""

        return User.objects.create_user(**validated_data)


class LoginSerializer(serializers.Serializer):
    """Serializes login requests for existing users"""

    email = serializers.CharField(max_length=255)
    username = serializers.CharField(max_length=255, read_only=True)
    password = serializers.CharField(max_length=255, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        """Ensure user credentials match credentials in database"""

        email = data.get("email", None)
        password = data.get("password", None)

        if email is None:
            raise serializers.ValidationError(
                "An email address is required to login"
            )

        if password is None:
            raise serializers.ValidationError(
                "A password is required to login"
            )

        user = authenticate(username=email, password=password)
        if user is None:
            raise serializers.ValidationError("Invalid credentials")
        if not user.is_active:
            raise serializers.ValidationError("This user has been deactivated")

        return {
            "email": user.email,
            "username": user.username,
            "token": user.token,
        }


class UserSerializer(serializers.ModelSerializer):
    """Serializes user object"""

    password = serializers.CharField(
        write_only=True,
        min_length=8,
        error_messages={
            "blank": "Password cannot be empty.",
            "min_length": "Password must be at least 8 characters.",
        },
        style={"input_type": "password"},
        trim_whitespace=False,
    )

    profile = ProfileSerializer(write_only=True)
    bio = serializers.CharField(source="profile.bio", read_only=True)
    image = serializers.CharField(source="profile.image", read_only=True)

    class Meta:
        model = User
        fields = (
            "email",
            "username",
            "password",
            "token",
            "profile",
            "bio",
            "image",
        )
        read_only_fields = ("token",)

    def validate_profile(self, profile):
        if not profile["image"]:
            profile[
                "image"
            ] == "https://cdn11.bigcommerce.com/s-nf2x4/images/stencil/1280x1280/products/307/4245/muscle__52045.1520090269.png?c=2&imbypass=on"
            return profile
        if not re.match(regex, profile["image"]):
            raise serializers.ValidationError(
                "Please ensure image field is a valid URL"
            )
        return profile

    def update(self, instance, validated_data):
        """Update User"""

        password = validated_data.pop("password", None)
        profile_date = validated_data.pop("profile", {})

        for (key, value) in validated_data.items():
            setattr(instance, key, value)

        if password:
            instance.set_password(password)

        instance.save()

        for (key, value) in profile_date.items():
            setattr(instance.profile, key, value)

        instance.profile.save()

        return instance
