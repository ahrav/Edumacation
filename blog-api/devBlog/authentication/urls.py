from django.urls import path

from .views import (
    RegistrationAPIView,
    LoginAPIView,
    UserRetrieveUpdateAPIView,
    UserExistsAPIView,
)

app_name = "authentication"
urlpatterns = [
    path("", RegistrationAPIView.as_view(), name="user-registration"),
    path("me/", UserRetrieveUpdateAPIView.as_view(), name="user-update"),
    path("login/", LoginAPIView.as_view(), name="user-login"),
    path("check_user/", UserExistsAPIView.as_view(), name="user-exists"),
]
