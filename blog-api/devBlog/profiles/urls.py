from django.urls import path

from .views import ProfileRetrieveAPIView, ProfileFollowAPIView

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
