from django import forms
from django.core.exceptions import ValidationError
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from .models import User


class UserCreationForm(forms.ModelForm):
    password = forms.CharField()
    password2 = forms.CharField()

    class Meta:
        model = User
        fields = ['phone' , 'name' , 'lastname' , 'email']

    def clean_name(self):
        name = self.cleaned_data.get('name')
        user = User.objects.filter(name = name).exists()
        if user:
            raise ValidationError('User with this Name already exists.')
        return name


    def clean_lastname(self): 
        lastname = self.cleaned_data.get('lastname')
        user = User.objects.filter(lastname = lastname).exists()
        if user:
            raise ValidationError('User with this Lastname already exists.')
        return lastname
       
    def clean_email(self):
        email = self.cleaned_data.get('email')
        if email:
            user =User.objects.filter(email = email).exists()
            if user:
                raise ValidationError('User with this Email already exists.')
            return email
        return email
            

    def clean_password2(self):
        cd = self.cleaned_data

        if cd['password'] and cd['password2'] and cd['password'] != cd['password2']:
            raise ValidationError('Passwords is not match')
        return cd['password2']
    
    
    def save(self, commit = True) :
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password'])
        if commit:
            user.save()
        return user
    

class UserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField()

    class Meta:
        model = User
        fields = ['phone' , 'name' , 'lastname' , 'email']
        