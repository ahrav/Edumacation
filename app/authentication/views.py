from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import RegistrationSerializer, LoginSerializer
from .renderer import UserJSONRenderer


class RegistrationAPIView(APIView):
    """Allow any user to access endpoint to create/ register account"""

    permission_class = (AllowAny,)
    serializer_class = RegistrationSerializer
    renderer_class = (UserJSONRenderer,)

    def post(self, request):
        """Method to handle creating a new user"""

        user = request.data.get("user", {})
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LoginAPIView(APIView):
    """Allow existing users to login"""

    permission_class = (AllowAny,)
    renderer_class = (UserJSONRenderer,)
    serializer_class = LoginSerializer

    def post(self, request):
        """Method to login user is credentials are valid"""

        user = request.data.get("user", {})
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
