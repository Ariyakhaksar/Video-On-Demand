from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from.models import User , OTP
from .forms import UserChangeForm , UserCreationForm

# Register your models here.

class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    list_display = ['name' , 'lastname' , 'phone' , 'is_admin']
    list_filter = ['is_admin']
    search_fields = ['name' , 'lastname']
    ordering = ('-id',)
    filter_horizontal = ()

    fieldsets = (
        ('جزئیات کاربر' , {'fields':('phone','name','lastname','email','password')}),
        ('دسترسی ها' , {'fields':('is_superuser' ,'is_admin' ,'is_active')}),
    )

    add_fieldsets = (
        ('Create Account',{'fields':('phone','name','lastname','email','password','password2')}),
    )
admin.site.register(User,UserAdmin)


@admin.register(OTP)
class OTPAdmin(admin.ModelAdmin):
    list_display = ['phone','code']