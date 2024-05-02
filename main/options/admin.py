from django.contrib import admin

from .models import *
# Register your models here.


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ['question']

@admin.register(SaveMovie)
class SaveMovieAdmin(admin.ModelAdmin):
    list_display = ['user' , 'movie']

@admin.register(SaveSeryal)
class SaveSeryalAdmin(admin.ModelAdmin):
    list_display = ['user' , 'seryal']

@admin.register(VoteMovie)
class VoteMovieAdmin(admin.ModelAdmin):
    list_display = ['user' , 'movie' , 'liked']

@admin.register(VoteSeryal)
class VoteSeryalAdmin(admin.ModelAdmin):
    list_display = ['user' , 'seryal' , 'liked']


@admin.register(CommentMovie)
class CommentMovieAdmin(admin.ModelAdmin):
    list_display = ['user' , 'movie' ,'id']

@admin.register(CommentSeryal)
class CommentSeryalAdmin(admin.ModelAdmin):
    list_display = ['user' , 'seryal' , 'id']