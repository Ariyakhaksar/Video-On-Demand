from django.test import SimpleTestCase
from django.urls import reverse , resolve

from rest_framework_simplejwt.views import TokenRefreshView

from accounts import views


class TestUrls(SimpleTestCase):

    def test_token(self):
        url = reverse('token')
        self.assertEqual(resolve(url).func.view_class,views.MyTokenObtainPairView)

    def test_refresh(self):
        url = reverse('token_refresh')
        self.assertEqual(resolve(url).func.view_class , TokenRefreshView)

    def test_authentication(self):
        url = reverse('authentication')
        self.assertEqual(resolve(url).func.view_class, views.UserAuthenticationAPIView)

    def test_veryfy_otp(self):
        url = reverse('veryfy')
        self.assertEqual(resolve(url).func.view_class , views.VeryfyOtpAPIView)

    def test_register(self):
        url = reverse('register')
        self.assertEqual(resolve(url).func.view_class , views.UserRegisterAPIView)