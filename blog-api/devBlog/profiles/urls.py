from django.urls import path

from .views import ProfileFollowAPIView, ProfileRetrieveAPIView

app_name = "profiles"
urlpatterns = [
    path(
        "<str:username>/",
        ProfileRetrieveAPIView.as_view(),
        name="profile-detail",
    ),
    path(
        "<str:username>/follow/",
        ProfileFollowAPIView.as_view(),
        name="profile-follow",
    ),
]
