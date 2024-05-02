from django.test import TestCase

from content.models import *


class TestCategoryModel(TestCase):

    def setUp(self) -> None:
        self.category = Category.objects.create(
            title = 'Test',
            slug = 'test',
            baner = 'https://s3.ir-thr-at1.arvanstorage.com/project-vod/image_category/category_laptop.png?AWSAccessKeyId=47456b6b-46f1-4e29-a1d9-43238c6823f4&Signature=fyny2naui4ufdhJwNPdasyaYrMM%3D&Expires=1713793038'
        )

    def test_module_str(self):
        self.assertEqual(str(self.category), 'Test')


class TestMoviesModelModel(TestCase):
    def setUp(self):
        self.movie = Movies.objects.create(
        title='Test Movie...',
        content='This is a test movie',
        restriction=18,
        construction=120,
        slug='test-movie'
    )

    def test_module_str(self):
        self.assertEqual(str(self.movie), 'Test Movie...')


class TestSeryalModel(TestCase):

    def setUp(self) -> None:
        self.seryal = Seryal.objects.create(
            title = 'Test Seryal...',
            content = 'Test Content',
            restriction = 18,
            construction = 2020,
            slug = 'test-slug'
        )

    def test_module_str(self):
        self.assertEqual(str(self.seryal), 'Test Seryal...')


class TestPartSeryalModel(TestCase):

    def setUp(self) -> None:
        self.part_seryal = PartSeryal.objects.create(
            part = 'Part_One...'
        )

    def test_module_str(self):
        self.assertEqual(str(self.part_seryal), 'Part_One...')
