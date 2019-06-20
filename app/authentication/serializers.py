from django.contrib.auth import authenticate

from rest_framework import serializers

from .models import User


class RegistrationSerializer(serializers.ModelSerializer):
    """Serializes registration requests and creates a new user"""

    password = serializers.CharField(
        max_length=128, min_length=8, write_only=True
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
