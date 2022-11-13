from django.test import TestCase
from .models import *

class Pants_sizeTestCase(TestCase):
    def setUp(self):
        Pants_size.objects.create(waist_size="50", hip_size="50", thigh_size="50", calf_size="50", rise="50", inseam="50")
        Pants_size.objects.create(waist_size="40", hip_size="40", thigh_size="40", calf_size="40", rise="40", inseam="40")
        Pants_size.objects.create(waist_size="60", hip_size="60", thigh_size="60", calf_size="60", rise="60", inseam="60")

    def test_pants_size_count(self):
        self.assertEqual(Pants_size.objects.all().count(), 3)

class ClothesTestCase(TestCase):
    def setUp(self):
        pants_size = Pants_size.objects.create(waist_size="50", hip_size="50", thigh_size="50", calf_size="50", rise="50", inseam="50")
        Clothes.objects.create(style="캐주얼", brand="토피", price="50000", URL="https", photo="src.", size=pants_size)
        Clothes.objects.create(style="댄디", brand="토피", price="50000", URL="https", photo="src.", size=pants_size)
        Clothes.objects.create(style="스트릿", brand="토피", price="50000", URL="https", photo="src.", size=pants_size)

    def test_clothes_count(self):
        self.assertEqual(Clothes.objects.all().count(), 3)

class MyuserTestCase(TestCase):
    def setUp(self):
        pants_size = Pants_size.objects.create(waist_size="50", hip_size="50", thigh_size="50", calf_size="50", rise="50", inseam="50")
        clothes = Clothes.objects.create(style="캐주얼", brand="토피", price="50000", URL="https", photo="src.", size=pants_size)
        Myuser.objects.create(nickname="kane", chest_size="30", waist_size="30", thigh_size="30", calf_size="30")
    
    def test_myuser_count(self):
        self.assertEqual(Myuser.objects.all().count(), 1)