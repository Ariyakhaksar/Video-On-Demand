from django.db import models

# Create your models here.



class Category(models.Model):
    title = models.CharField(max_length=255 , verbose_name="عنوان")
    slug = models.SlugField(max_length=50 , verbose_name="اسلاگ")
    baner = models.ImageField(upload_to='image_category' , verbose_name="پوستر دسته‌بندی")

    class Meta:
        verbose_name = "دسته‌بندی‌ "
        verbose_name_plural = "دسته‌بندی‌ ها"


    def __str__(self) -> str:
        return self.title
    

class Movies(models.Model):
    category = models.ManyToManyField(Category , related_name='movie_category' ,verbose_name = "دسته‌بندی‌ ")
    title = models.CharField(max_length=255 ,verbose_name = "عنوان ")
    content = models.TextField(verbose_name = "درباره فیلم ")
    restriction = models.IntegerField(verbose_name = "محدودیت سنی ")
    construction = models.IntegerField(verbose_name = "سال ساخت فیلم ")
    baner = models.ImageField(upload_to='image_movies' ,verbose_name = "پوستر فیلم ")
    image = models.ImageField(upload_to='image_details' ,verbose_name = "یک عکس از صحنه فیلم ( برای نمایش در صفحه جزئیات فیلم) ")
    video = models.FileField(upload_to='movies' ,verbose_name = "ویدئو ")

    slug = models.SlugField(max_length=50 ,verbose_name = "اسلاگ ")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "فیلم"
        verbose_name_plural = "فیلم ها"

    def __str__(self) -> str:
        return self.title
    
    
class Seryal(models.Model):
    category = models.ManyToManyField(Category , related_name='seryal_category' ,verbose_name = "دسته‌بندی‌ ")
    title = models.CharField(max_length=255 ,verbose_name = "عنوان ")
    content = models.TextField(verbose_name = "درباره سریال ")
    restriction = models.IntegerField(verbose_name = "محدودیت سنی ")
    construction = models.IntegerField(verbose_name = "سال ساخت سریال ")
    baner = models.ImageField(upload_to='image_movies' ,verbose_name = "پوستر فیلم ")
    image = models.ImageField(upload_to='image_details', verbose_name = "یک عکس از صحنه سریال ( برای نمایش در صفحه جزئیات سریال) ")

    slug = models.SlugField(max_length=50 ,verbose_name = "اسلاگ ")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "سریال"
        verbose_name_plural = "سریال ها"

    def __str__(self) -> str:
        return self.title


class PartSeryal(models.Model):
    part = models.CharField(max_length=255 , verbose_name='عنوان')
    video = models.FileField(upload_to='part_seryals' , verbose_name="آپلود قسمت فیلم")
    seryal = models.ForeignKey(Seryal, on_delete=models.CASCADE,null=True,blank=True , related_name='parts_seryal')

    class Meta:
        verbose_name = "قسمت سریال"
        verbose_name_plural = "قسمت سریال ها"

    def __str__(self) -> str:
        return self.part


