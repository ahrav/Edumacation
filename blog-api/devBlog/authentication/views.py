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
from .models import User


class UserRetrieveUpdateAPIView(RetrieveUpdateAPIView):
    """Allow users to modify their accounts"""

    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    # renderer_classes = (UserJSONRenderer,)

    def retrieve(self, request, *args, **kwargs):
        """return user object"""

        serializer = self.serializer_class(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        """update user information"""

        serializer_data = {
            "username": request.data.get("username", request.user.username),
            "email": request.data.get("email", request.user.email),
            "password": request.data.get("password", request.user.password),
            "profile": {
                "bio": request.data.get("bio", request.user.profile.bio),
                "image": request.data.get("image"),
            },
        }

        serializer = self.serializer_class(
            request.user, data=serializer_data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        """delete account """

        user = request.user
        user.delete()

        return Response(None, status=status.HTTP_204_NO_CONTENT)


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
