from rest_framework import status
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .renderers import UserJSONRenderer
from .serializers import (
    LoginSerializer,
    RegistrationSerializer,
    UserSerializer,
)


class UserRetrieveUpdateAPIView(RetrieveUpdateAPIView):
    """Allow users to modify their accounts"""

    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    renderer_class = (UserJSONRenderer,)

    def retrieve(self, request, *args, **kwargs):
        """return user object"""

        serializer = self.serializer_class(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        """update user information"""

        user_data = request.data.get("user", {})
        serializer_data = {
            "username": user_data.get("username", request.user.username),
            "email": user_data.get("email", request.user.email),
            "profile": {
                "bio": user_data.get("bio", request.user.profile.bio),
                "image": user_data.get("image", request.user.profile.image),
            },
        }

        serializer = self.serializer_class(
            request.user, data=serializer_data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)


class RegistrationAPIView(APIView):
    """Allow any user to access endpoint to create/ register account"""

    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer
    renderer_class = (UserJSONRenderer,)

    def post(self, request):
        """Method to handle creating a new user"""
        username = request.data.get("username", "")
        email = request.data.get("email", "")
        password = request.data.get("password", "")
        user = {"email": email, "password": password, "username": username}
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LoginAPIView(APIView):
    """Allow existing users to login"""

    permission_classes = (AllowAny,)
    renderer_class = (UserJSONRenderer,)
    serializer_class = LoginSerializer

    def post(self, request):
        """Method to login user is credentials are valid"""

        email = request.data.get("email", "")
        password = request.data.get("password", "")
        user = {"email": email, "password": password}
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
