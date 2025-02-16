from .views import CustomTokenObtainPairView, CustomTokenRefreshView, CurrentUserView
from django.urls import path

urlpatterns = [
    path("token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", CustomTokenRefreshView.as_view(), name="token_refresh"),
    path('current-user/', CurrentUserView.as_view(), name='current_user'),
]
