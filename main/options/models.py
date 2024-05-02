from django.db import models

from accounts.models import User

from content.models import Movies , Seryal

# Create your models here.


class FAQ(models.Model):
     question =models.CharField(max_length=255 , verbose_name='سوال')
     answer = models.TextField(verbose_name='جواب')

     class Meta:
        verbose_name = "سوال"
        verbose_name_plural = "سوالات متداول"

     def __str__(self) -> str:
          return self.question    


class SaveMovie(models.Model):
    user = models.ForeignKey(User , on_delete=models.CASCADE , related_name='user_save' , verbose_name='کدام کاربر')
    movie = models.ForeignKey(Movies , on_delete=models.CASCADE , related_name='movie_save' , verbose_name='کدام فیلم رو ذخیره کرده')

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "ذخیره فیلم"
        verbose_name_plural = "فیلم های ذخیره شده توسط کاربران ( افزودن به علاقه مندی ها)"

    def __str__(self) -> str:
         return f'{self.user} Save Movie {self.movie}'
    

class SaveSeryal(models.Model):
    user = models.ForeignKey(User , on_delete=models.CASCADE , related_name='seryal_user' , verbose_name='کدام کاربر')
    seryal = models.ForeignKey(Seryal , on_delete=models.CASCADE , related_name='seryal_save' , verbose_name='کدام سریال رو ذخیره کرده')

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "ذخیره سریال"
        verbose_name_plural = "سریال های ذخیره شده توسط کاربران ( افزودن به علاقه مندی ها)"

    def __str__(self) -> str:
         return f'{self.user} Save Seryal {self.seryal}'
    

class VoteMovie(models.Model):
    user = models.ForeignKey(User , on_delete=models.CASCADE , related_name='vote_user' , verbose_name='کدام کاربر')
    movie = models.ForeignKey(Movies , on_delete=models.CASCADE , related_name='vote_movie' , verbose_name='کدام فیلم را پسندیده')
    liked = models.BooleanField(verbose_name='واکنش')

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "پسندیدن"
        verbose_name_plural = "فیلم هایی که کاربران لایک/دیس لایک کردن"

    def __str__(self) -> str:
         return f'{self.user} Save Seryal {self.movie}'
    

class VoteSeryal(models.Model):
    user = models.ForeignKey(User , on_delete=models.CASCADE , related_name='user_vote' , verbose_name='کدام کاربر')
    seryal = models.ForeignKey(Seryal , on_delete=models.CASCADE , related_name='seryal_vote' , verbose_name='کدام سریال را پسندیده')
    liked = models.BooleanField(verbose_name='واکنش')

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "پسندیدن"
        verbose_name_plural = "سریال هایی که کاربران لایک/دیس لایک کردن"

    def __str__(self) -> str:
         return f'{self.user} Liked Seryal {self.seryal}'


class CommentMovie(models.Model):
     user = models.ForeignKey(User , on_delete=models.CASCADE , related_name='comment_user' , verbose_name='کدام کاربر')
     movie = models.ForeignKey(Movies , on_delete=models.CASCADE , related_name='comment_movie' , verbose_name='برای کدام فیلم نظر داد')
     message = models.TextField(verbose_name='پیغام')

     created = models.DateTimeField(auto_now_add=True)
     updated = models.DateTimeField(auto_now=True)

     class Meta:
        verbose_name = "کامنت"
        verbose_name_plural = "کامنت های فیلم ها"

     def __str__(self) -> str:
         return f'{self.user} Commented... {self.movie}'


class CommentSeryal(models.Model):
     user = models.ForeignKey(User , on_delete=models.CASCADE , related_name='user_comment' , verbose_name='کدام کاربر')
     seryal = models.ForeignKey(Seryal , on_delete=models.CASCADE , related_name='seryal_comment', verbose_name='برای کدام سریال نظر داد')
     message = models.TextField(verbose_name='پیغام')

     created = models.DateTimeField(auto_now_add=True)
     updated = models.DateTimeField(auto_now=True)

     class Meta:
        verbose_name = "کامنت"
        verbose_name_plural = "کامنت های سریال ها"

     def __str__(self) -> str:
         return f'{self.user} Commented... {self.seryal}'







     