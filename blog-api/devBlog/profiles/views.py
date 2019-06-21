from rest_framework import status, serializers
from rest_framework.exceptions import NotFound
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

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

        serializer = self.serializer_class(
            profile, context={"request": request}
        )
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProfileFollowAPIView(APIView):
    """view which will handle following other profiles"""

    permission_classes = (IsAuthenticated,)
    serializer_class = ProfileSerializer

    def delete(self, request, username=None):
        follower = self.request.user.profile

        try:
            followee = Profile.objects.get(user__username=username)
        except Profile.DoesNotExist:
            raise NotFound("A profile with that username does not exist")

        follower.unfollow(followee)

        serializer = self.serializer_class(
            followee, context={"request": request}
        )

        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, username=None):
        """method to follow another profile"""

        follower = self.request.user.profile

        try:
            followee = Profile.objects.get(user__username=username)
        except Profile.DoesNotExist:
            raise NotFound("A profile with that username was not found")

        if follower.pk is followee.pk:
            raise serializers.ValidationError(
                "You can not follow yourself, be social!"
            )

        follower.follow(followee)

        serializer = self.serializer_class(
            followee, context={"request": request}
        )

        return Response(serializer.data, status=status.HTTP_201_CREATED)
