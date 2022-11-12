from django.test import TestCase
from .models import *

class Pants_sizeTestCase(TestCase):
    def setUp(self):
        Pants_size.objects.create(waist_size="50", hip_size="50", thigh_size="50", calf_size="50", rise="50", inseam="50")
        Pants_size.objects.create(waist_size="40", hip_size="40", thigh_size="40", calf_size="40", rise="40", inseam="40")
        Pants_size.objects.create(waist_size="60", hip_size="60", thigh_size="60", calf_size="60", rise="60", inseam="60")

    def test_pants_size_count(self):
        self.assertEqual(Pants_size.objects.all().count(), 3)
# Create your tests here.
