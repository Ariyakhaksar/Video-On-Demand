from django.urls import path

from .import views

urlpatterns = [
    path('categorys/',views.CategorysAPIView.as_view(),name='categorys'),
    path('category/<slug:slug_category>/',views.CategoryRetrieveAPIView.as_view(),name='category'),

    path('movies/',views.MoviesAPIView.as_view(),name='movies'),
    path('movie/<slug:slug_movie>/',views.MovieRetrieveAPIView.as_view(),name='movie'),

    path('seryals/',views.SeryalsAPIView.as_view(),name='seryals'),
    path('seryal/<slug:slug_seryal>/',views.SeryalRetrieveAPIView.as_view(),name='seryal'),

    path('recommended/movies/',views.RecommendedMovieAPIView.as_view(),name='recommended_movies'),
    path('recommended/seryals/',views.RecommendedSeryalAPIView.as_view(),name='recommended_seryals'),
]
