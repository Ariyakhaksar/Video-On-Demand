from django.test import TestCase

from options.models import *

class TestFAQModel(TestCase):

    def setUp(self) -> None:
        self.faq = FAQ.objects.create(
            question = 'Test',
            answer = 'Test'
        )

    def test_module_str(self):
        self.assertEqual(str(self.faq), 'Test')