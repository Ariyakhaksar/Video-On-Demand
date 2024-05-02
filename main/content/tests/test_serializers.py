from django.test import TestCase
from content.models import Seryal, PartSeryal
from content.serializers import SeryalSerializer, PartSeryalSerializer


# Problem...
class TestSeryalSerializer(TestCase):

    def test_get_parts(self):
        pass