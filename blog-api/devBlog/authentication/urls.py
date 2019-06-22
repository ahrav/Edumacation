from django.urls import path

from .views import (
    RegistrationAPIView,
    LoginAPIView,
    UserRetrieveUpdateDeleteAPIView,
)

app_name = "authentication"
urlpatterns = [
    path("", RegistrationAPIView.as_view(), name="user-registration"),
    path("me/", UserRetrieveUpdateDeleteAPIView.as_view(), name="user-update"),
    path("login/", LoginAPIView.as_view(), name="user-login"),
]
