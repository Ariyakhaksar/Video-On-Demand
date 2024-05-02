from django.contrib.auth import login , authenticate, logout

from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

from .utils import send_otp
from .models import OTP , User
from .serializers import (

    MyTokenObtainPairSerializer,
    UserAuthenticationSerializer,
    UserRegisterSerializer,
    VeryfyOtpSerializer,
)

import random
# Create your views here.



class MyTokenObtainPairView(TokenObtainPairView):
    """
        Create token and logined user

        Requeired filds:

        phone: 0910.......

        password: password....
    """
    serializer_class = MyTokenObtainPairSerializer


class UserAuthenticationAPIView(APIView):
    """
        Level 1 Register users

        In this view, the user's phone is captured. 📞

        If the mobile phone already exists, an error occurs. ❌

        Required fields: phone 📲

    """
    serializer_class = UserAuthenticationSerializer

    def post(self , request):
        srz_data = self.serializer_class(data=request.data)

        if srz_data.is_valid():
            vd = srz_data.validated_data
            create_otp = random.randint(100000,999999)
            send_otp(vd['phone'] , create_otp)
            OTP.objects.create(phone = vd['phone'] , code = create_otp)
            request.session['authentication'] = {
                'phone':vd['phone']
            }
            return Response(f"Send Code to {vd['phone']}" , status=status.HTTP_302_FOUND)
        return Response(srz_data.errors,status=status.HTTP_400_BAD_REQUEST)
    

class VeryfyOtpAPIView(APIView):
    """
        Level 2 Register users

        In this view, a 6-digit code is sent to the user's phone.

        Required fields: code 

    """
    serializer_class = VeryfyOtpSerializer

    def post(self , request):
        user_session = request.session['authentication']
        get_phone = OTP.objects.get(phone = user_session['phone'])
        srz_data =self.serializer_class(data= request.data)

        if srz_data.is_valid():
            vd = srz_data.validated_data
            if vd['code'] == get_phone.code:
                get_phone.delete()
                return Response('Code Valid...' , status=status.HTTP_302_FOUND)
            else:
                return Response('Code invalid...' , status=status.HTTP_400_BAD_REQUEST)
        return Response(srz_data.errors)


class UserRegisterAPIView(APIView):
    """
        Final leve register users

        In this view, an account is created for the user. 

        Required fields:
        - name
        - lastname
        - email ===> not required
        - password
        - password2

        Note: An error will be displayed if the fields "Password" and "Password2" do not match.

        Note: Filling in the "email" field is not required.

        Note: If the email field already exists, it will throw an error. 

    """
    serializer_class = UserRegisterSerializer

    def post(self , request):
        user_session = request.session['authentication']
        srz_data = self.serializer_class(data=request.data)

        if srz_data.is_valid():
            vd = srz_data.validated_data
            User.objects.create_user(
                phone = user_session['phone'],
                name = vd['name'],
                lastname = vd['lastname'],
                email = vd['email'],
                password = vd['password']
            )
            return Response(data=srz_data.data , status=status.HTTP_201_CREATED)
        return Response(srz_data.errors,status=status.HTTP_400_BAD_REQUEST)
    
    
    

            




