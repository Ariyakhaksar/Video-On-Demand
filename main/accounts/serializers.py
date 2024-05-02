from django.core.exceptions import ValidationError

from rest_framework import serializers

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User


class UserAuthenticationSerializer(serializers.Serializer):
    phone = serializers.CharField()

    def validate_phone(self,value):
        if User.objects.filter(phone = value).exists():
            raise ValidationError('Phone already exists...')
        
        if not value.startswith('09'):
            raise ValidationError('Number phone invalid...')
        
        return value

class VeryfyOtpSerializer(serializers.Serializer):
    code = serializers.IntegerField()

class UserRegisterSerializer(serializers.Serializer):
    name = serializers.CharField()
    lastname = serializers.CharField()
    email = serializers.EmailField(required = False)
    password = serializers.CharField()
    password2 = serializers.CharField()

    def validate_email(self,value):
        if User.objects.filter(email = value).exists():
            raise ValidationError('Email already exists...')
        return value

    def validate(self,value):
        #value = self.validated_data
        if value['password'] and value['password2'] and value['password'] != value['password2']:
            raise serializers.ValidationError('Passwords is not Match')
        return value

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['phone'] = user.phone
        token['name'] = user.name
        token['lastname'] = user.lastname
        token['password'] = user.password
        # ...

        return token
    
