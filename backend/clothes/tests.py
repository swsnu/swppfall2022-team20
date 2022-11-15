from django.test import TestCase, Client
from .models import *
from django.utils import timezone

#models.py testing
        
class BackendTestCase(TestCase):
    def setUp(self):
        pants_size = Pants_size.objects.create(length="40", waist_size="40", thigh_size="40", calf_size="40")
        Pants_size.objects.create(length="60", waist_size="60", thigh_size="60", calf_size="60")
        clothes1 = Clothes.objects.create(style="denim", brand="토피", price="50000", URL="https", photo="src.", size=pants_size)
        Clothes.objects.create(style="댄디", brand="토피", price="50000", URL="https", photo="src.", size=pants_size)
        Clothes.objects.create(style="스트릿", brand="토피", price="50000", URL="https", photo="src.", size=pants_size)
        user1 = Myuser.objects.create(nickname="kane", length="30", waist_size="30", thigh_size="30", calf_size="30")
        
        user1.scrapped.add(clothes1)
        
        review1 = Review.objects.create(upload_time=timezone.now(), content="I am a review.", photo="imgsrc", reviewing_clothes=clothes1, uploaded_user=user1)
        Comment.objects.create(upload_time=timezone.now(), content="I am the first comment.", uploaded_user = user1, original_review = review1)
        Comment.objects.create(upload_time=timezone.now(), content="I am the second comment.", uploaded_user = user1, original_review = review1)

    def test_pants_size_count(self):
        self.assertEqual(Pants_size.objects.all().count(), 2)

    def test_clothes_count(self):
        self.assertEqual(Clothes.objects.all().count(), 3)
    
    def test_myuser_count(self):
        self.assertEqual(Myuser.objects.all().count(), 1)

    def test_review_count(self):
        self.assertEqual(Review.objects.all().count(), 1)

    def test_comment_count(self):
        self.assertEqual(Comment.objects.all().count(), 2)

    def test_main(self) -> None:
        client = Client()
        response = client.get('/api/clothes/main/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('denim', response.content.decode())

    def test_reviewsList(self) -> None:
        client = Client()
        response = client.get('/api/clothes/reviews/1/')
        self.assertEqual(response.status_code, 200)

    def test_uploadedReviewsList(self) -> None:
        client = Client()
        response = client.get('/api/clothes/reviews/read/1/')
        self.assertEqual(response.status_code, 200)
        #self.assertIn('review', response.content.decode())

    def test_comment(self) -> None:
        client = Client()
        response = client.get('/api/clothes/comments/1/')
        self.assertEqual(response.status_code, 201)
        #self.assertIn('first', response.content.decode())

    def test_scrappedList(self) -> None:
        client = Client()
        response = client.get('/api/clothes/scrapped/read/1/')
        self.assertEqual(response.status_code, 200)
        #self.assertIn('denim', response.content.decode())

    def test_scrapItem(self) -> None:
        client = Client()
        response = client.get('/api/clothes/scrapped/put/1/')
        #self.assertEqual(response.status_code, 201)