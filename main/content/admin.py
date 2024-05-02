from django.contrib import admin

from .models import *
# Register your models here.


@admin.register(Movies)
class MovieAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',)}
    list_display = ['title' , 'id']    

@admin.register(Category)
class MovieAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',)}
    list_display = ['title','id']   


class PartSeryalInline(admin.TabularInline):
    model = PartSeryal
    
@admin.register(Seryal)
class SeryalAdmin(admin.ModelAdmin):
    inlines = (PartSeryalInline ,)
    list_display = ['title' , 'id']
    prepopulated_fields = {'slug':('title',)}