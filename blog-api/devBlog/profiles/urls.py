from django.urls import path

from .views import ProfileRetrieveAPIView

app_name = "profiles"
urlpatterns = [
    path(
        "<str:username>/",
        ProfileRetrieveAPIView.as_view(),
        name="profile-retrieve",
    )
]
