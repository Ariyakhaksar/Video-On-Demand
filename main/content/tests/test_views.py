from django.test import TestCase , Client
from django.urls import reverse

from content import views
from content.models import *


class TestCategorysAPIView(TestCase):

    def setUp(self) -> None:
        self.client = Client()

    def test_categorys_APIView_GET(self):
        response = self.client.get(reverse('categorys'))
        self.assertEqual(response.status_code , 200)


class TestCategoryRetrieveAPIView(TestCase):

    def setUp(self) -> None:
        self.client = Client()

        Category.objects.create(
            title = 'test',
            slug ='slug-test'
        )

    def test_category_retrieve_APIView_GET(self):
        response = self.client.get(reverse('category',args=['slug-test']))
        self.assertEqual(response.status_code , 200)

    
class TestMoviesAPIView(TestCase):

    def setUp(self) -> None:
        self.client = Client()

    def test_test_movies_APIView_GET(self):
        response = self.client.get(reverse('movies'))
        self.assertEqual(response.status_code, 200)


class TestMovieRetrieveAPIView(TestCase):

    def setUp(self) -> None:
        self.client = Client()

        Movies.objects.create(
            title = 'Test',
            content = 'Test',
            restriction = 19,
            construction = 2020,
            slug = 'movie-slug'
        )

    def test_movie_retrieve_APIView_GET(self):
        response = self.client.get(reverse('movie',args=['movie-slug']))
        self.assertEqual(response.status_code, 200)


class TestSeryalsAPIView(TestCase):

    def setUp(self) -> None:
        self.client = Client()

    def test_seryals_APIView_GET(self):
        response = self.client.get(reverse('seryals'))
        self.assertEqual(response.status_code , 200)


class TestSeryalRetrieveAPIView(TestCase):

    def setUp(self) -> None:
        self.client = Client()

        Seryal.objects.create(
            title = 'Test',
            content = 'Test',
            restriction = 19,
            construction = 2020,
            slug = 'seryal-slug'
        )

    def test_seryal_retrieve_APIView_GET(self):
        response = self.client.get(reverse('seryal',args=['seryal-slug']))
        self.assertEqual(response.status_code , 200)


class TestRecommendedMovieAPIView(TestCase):

    def setUp(self) -> None:
        self.client = Client()

        random_movie_1 = Movies.objects.create(
            title = 'Test',
            content = 'Test',
            restriction = 19,
            construction = 2020,
            slug = 'movie-slug'
        )

        random_movie_2 = Movies.objects.create(
            title = 'Test2',
            content = 'Test2',
            restriction = 19,
            construction = 2020,
            slug = 'movie2-slug'
        )

        random_movie_3 = Movies.objects.create(
            title = 'Test3',
            content = 'Test3',
            restriction = 19,
            construction = 2020,
            slug = 'movie3-slug'
        )

        random_movie_4 = Movies.objects.create(
            title = 'Test4',
            content = 'Test4',
            restriction = 19,
            construction = 2020,
            slug = 'movie4-slug'
        )

    def test_recommended_movie_APIView_GET(self):
        response = self.client.get(reverse('recommended_movies'))
        self.assertEqual(response.status_code , 200)


class TestRecommendedSeryalAPIView(TestCase):

    def setUp(self) -> None:
        self .client = Client()

        random_seryal_1 = Seryal.objects.create(
            title = 'Test1',
            content = 'Test1',
            restriction = 20,
            construction = 2020,
            slug = 'test1-slug'
        )

        random_seryal_2 = Seryal.objects.create(
            title = 'Test2',
            content = 'Test2',
            restriction = 20,
            construction = 2020,
            slug = 'test2-slug'
        )

        random_seryal_3= Seryal.objects.create(
            title = 'Test3',
            content = 'Test3',
            restriction = 20,
            construction = 2020,
            slug = 'test3-slug'
        )

        random_seryal_4 = Seryal.objects.create(
            title = 'Test4',
            content = 'Test4',
            restriction = 20,
            construction = 2020,
            slug = 'test4-slug'
        )

    def test_recommended_seryal_APIView_GET(self):
        response = self.client.get(reverse('recommended_seryals'))
        self.assertEqual(response.status_code, 200)