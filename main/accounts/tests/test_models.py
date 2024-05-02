from django.test import TestCase

from accounts.models import User , OTP


class TestUserModel(TestCase):

    def setUp(self) -> None:
        self.user = User.objects.create_user(
            phone = '09999999999',
            name ='Roya',
            lastname = 'Shakori',
            email = 'roya@gmail.com',
            password = 'roya@5',
        )

    def test_module_str(self):
        self.assertEqual(str(self.user), 'Roya')


class TestOTPModel(TestCase):

    def setUp(self) -> None:
        self.otp = OTP.objects.create(
            phone = '09345678902',
            code = '123456'
        )

    def test_module_otp(self):
        self.assertEqual(str(self.otp), '09345678902 Code Veryfy : 123456')        
