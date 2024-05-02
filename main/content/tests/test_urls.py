from django.test import SimpleTestCase
from django.urls import reverse , resolve

from rest_framework_simplejwt.views import TokenRefreshView

from content import views


class TestUrls(SimpleTestCase):

    def test_categorys(self):
        url = reverse('categorys')
        self.assertEqual(resolve(url).func.view_class , views.CategorysAPIView)

    def test_category(self):
        url= reverse('category' , args=['deram'])
        self.assertEqual(resolve(url).func.view_class , views.CategoryRetrieveAPIView)

    def test_movies(self):
        url = reverse('movies')
        self.assertEqual(resolve(url).func.view_class , views.MoviesAPIView)

    def test_movie(self):
        url = reverse('movie',args=['movie-action-1'])
        self.assertEqual(resolve(url).func.view_class , views.MovieRetrieveAPIView)

    def test_seryals(self):
        url = reverse('seryals')
        self.assertEqual(resolve(url).func.view_class , views.SeryalsAPIView)

    def test_seryal(self):
        url = reverse('seryal',args=['test-sseryal'])
        self.assertEqual(resolve(url).func.view_class ,views.SeryalRetrieveAPIView)

    def test_recommended_movies(self):
        url = reverse('recommended_movies')
        self.assertEqual(resolve(url).func.view_class , views.RecommendedMovieAPIView)

    def test_recommended_seryals(self):
        url = reverse('recommended_seryals')
        self.assertEqual(resolve(url).func.view_class , views.RecommendedSeryalAPIView)
    