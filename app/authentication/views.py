from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import RegistrationSerializer


class RegistrationAPIView(APIView):
    """Allow any user to access endpoint to create/ register account"""

    permission_class = (AllowAny,)
    serializer_class = RegistrationSerializer

    def post(self, request):
        """Method to handle creating a new user"""

        user = request.data.get("user", {})
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
