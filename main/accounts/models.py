from django.db import models
from django.contrib.auth.models import AbstractBaseUser , PermissionsMixin
from django.core.validators import validate_integer

from .managers import UserManager
from .validators import valid_phone
# Create your models here.


class User(AbstractBaseUser,PermissionsMixin):
    phone = models.CharField(max_length=11 , validators=[validate_integer , valid_phone] , unique=True , verbose_name ="تلفن" )
    name = models.CharField(max_length= 255 ,verbose_name ="نام")
    lastname = models.CharField(max_length= 255,verbose_name ="نام خانوادگی")
    email = models.EmailField(max_length=255 , unique=True , null=True , blank=True ,verbose_name ="ایمیل")

    is_admin = models.BooleanField(default=False ,verbose_name ="کاربر ادمین باشد (دسترسی به پنل ادمین داشته باشد؟)")
    is_active = models.BooleanField(default=True ,verbose_name ="کاربر فعال است؟")

    created =models.DateTimeField(auto_now_add=True)
    updated =models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'phone'
    REQUIRED_FIELDS = ['name' , 'lastname']

    objects = UserManager()

    class Meta:
        ordering = ('id',)
        verbose_name = "کاربر"
        verbose_name_plural = "کاربران"

    def __str__(self) -> str:
        return self.name
    
    def has_perm(self , perm , obj = None):
        return True
    
    def has_module_perms(self, app_label) :
        return True
    
    def is_staff(self):
        return self.is_admin
    

class OTP(models.Model):
    phone = models.CharField(max_length=11 , verbose_name ="تلفن")
    code = models.SmallIntegerField(verbose_name ="کد ( یک کد چهار رقمی است که به تلفن کاربر ارسال می‌شود , در مرحله رجیستر کردن )")

    created =models.DateTimeField(auto_now_add=True)
    updated =models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "کد"
        verbose_name_plural = "کد های پیامکی"


    def __str__(self) -> str:
        return f'{self.phone} Code Veryfy : {self.code}'
    
    
