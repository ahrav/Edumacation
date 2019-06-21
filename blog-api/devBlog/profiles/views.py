from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Profile
from .renderers import ProfileJSONRenderer
from .serializers import ProfileSerializer


class ProfileRetrieveAPIView(RetrieveUpdateDestroyAPIView):
    """View to handle getting all information related to a single user"""

    queryset = Profile.objects.select_related("user")
    serializer_class = ProfileSerializer
    # renderer_classes = (ProfileJSONRenderer,)
    permission_classes = (IsAuthenticated,)
    lookup_field = "username"

    def retrieve(self, request, username, *args, **kwargs):
        """try to retrieve user for given user"""

        try:
            profile = self.queryset.get(user__username=username)
        except Profile.DoesNotExist:
            raise NotFound("A profile with this username does not exist")

        serializer = self.serializer_class(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)
