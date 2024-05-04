from django.urls import path

from .import views

urlpatterns = [
    path('faqs/',views.FAQsAPIView.as_view(),name='faqs'),
    # Save movies
    path('list/saves/movie/',views.ListSaveMoviesAPIView.as_view(),name='save_movie_list'),
    path('save/movie/<int:movie_id>/',views.SaveMovieAPIView.as_view(),name='seve_movie'),
    #Save seryals
    path('list/saves/seryal/',views.ListSaveSeryalAPIView.as_view(),name='save_seryal_list'),
    path('save/seryal/<int:seryal_id>/',views.SaveSeryalAPIView.as_view(),name='seve_seryal'),
    # Vote movies
    path('like/movie/<int:movie_id>/',views.LikeMovieAPIView.as_view(),name='like_movie'),
    path('dislike/movie/<int:movie_id>/',views.DisLikeMovieAPIView.as_view(),name='dislike_movie'),
    # Vote seryals
    path('like/seryal/<int:seryal_id>/',views.LikeSeryalAPIView.as_view(),name='like_seryal'),
    path('dislike/seryal/<int:seryal_id>/',views.DisLikeSeryalAPIView.as_view(),name='dislike_seryal'),
    # CRUD comment movies
    path('comments/movie/<int:movie_id>/',views.ListCommentMoviesAPIView.as_view(),name='comments_movie'),
    path('create/comment/movie/<int:movie_id>/',views.CreateCommentMovieAPIView.as_view(),name= 'create_comment_movie'),
    path('update/comment/movie/<int:comment_id>/',views.UpdateCommentMovieAPIView.as_view(),name='update_comment_movie'),
    path('delete/comment/movie/<int:comment_id>/',views.DeleteCommentMovieAPIView.as_view() ,name='delete_comment_movie'),
    # CRUD comment seryals
    path('comments/seryal/<int:seryal_id>/',views.ListCommentSeryalsAPIView.as_view(),name='comments_seryal'),
    path('create/comment/seryal/<int:seryal_id>/',views.CreateCommentSeryalAPIView.as_view(),name='create_comment_seryal'),
    path('update/comment/seryal/<int:comment_id>/',views.UpdateCommentSeryalAPIView.as_view(),name='update_comment_seryal'),
    path('delete/comment/seryal/<int:comment_id>/',views.DeleteCommentSeryalAPIView.as_view(),name='delete_comment_seryal'),

    # Contact Us
    path('contact/',views.ContactUsAPIView.as_view(),name='contactus'),
]
