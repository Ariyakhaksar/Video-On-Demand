from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .import views

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Register User levels
    path('authentication/',views.UserAuthenticationAPIView.as_view(),name='authentication'),
    path('veryfy/otp/',views.VeryfyOtpAPIView.as_view() , name='veryfy'),
    path('register/',views.UserRegisterAPIView.as_view(),name='register'),

]
