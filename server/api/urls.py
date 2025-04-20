from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('auth/register/',RegisterView.as_view()),
    path('auth/token/',CustomTokenObtainPairView.as_view()),
    path('auth/token/refresh/',TokenRefreshView.as_view())

]