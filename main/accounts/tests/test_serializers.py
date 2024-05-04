from django.test import TestCase

from accounts.models import User
from accounts.serializers import *


class TestAuthenticationSerializer(TestCase):

    @classmethod
    def setUpTestData(self):
        User.objects.create_user(
            phone = '09100000001',
            name = 'Mohammad',
            lastname = 'Mohammadi',
            email = 'mohammad@gmail.com',
            password = 'Mohamad@5'
        )

    def test_valid_data(self):
        serializer = UserAuthenticationSerializer(data={
            'phone':'09234321234'
        })
        self.assertTrue(serializer.is_valid())

    def test_empty_data(self):
        serializer = UserAuthenticationSerializer(data={})
        self.assertFalse(serializer.is_valid())

    def test_phone_exist(self):
        serializer = UserAuthenticationSerializer(data={
            'phone':'09100000001'
        })
        if serializer.is_valid():
            self.assertEqual(len(serializer.errors),1)


class TestVeryfyOtpSerializer(TestCase):

    def test_valid_data(self):
        serializer = VeryfyOtpSerializer(data={
            'code':'1234'
        })
        self.assertTrue(serializer.is_valid())

    def test_empty_data(self):
        serializer = VeryfyOtpSerializer(data={})
        self.assertFalse(serializer.is_valid())


class TestUserRegisterSerializer(TestCase):

    @classmethod
    def setUpTestData(cls) -> None:
        User.objects.create_user(
            phone = '09100000001',
            name = 'Mohammad',
            lastname = 'Mohammadi',
            email = 'mohammad@gmail.com',
            password = 'Mohamad@5'
        )

    def test_valid_data(self):
        serializer = UserRegisterSerializer(data={
            'name':'Ali',
            'lastname':'Ghalenoei',
            'email':'ali@gmail.com',
            'password':'ali@5',
            'password2':'ali@5',
        })
        self.assertTrue(serializer.is_valid())

    def test_empty_data(self):
        serializer = UserRegisterSerializer(data={})
        self.assertFalse(serializer.is_valid())

    def test_email_exist(self):
        serializer = UserRegisterSerializer(data={
            'name' : 'Reza',
            'lastname' : 'Rezaei',
            'email' : 'mohammad@gmail.com',
            'password' : 'Mohamad@5',
            'password2' : 'Mohamad@5'
        })
        if serializer.is_valid():
            self.assertEqual(len(serializer.errors),1)

    def test_password_match(self):
        test_data = {
            'name' : 'Mohammad',
            'lastname' : 'Mohammadi',
            'email' : 'mohammad@gmail.com',
            'password' : 'Mohamad@5',
            'password2' : 'Mohamad@5'
        }
        serializer = UserRegisterSerializer()
        validated_data = serializer.validate(test_data)

        self.assertEqual(validated_data,test_data)
        
        