"""backend test module"""
import pytest
from django.test import TestCase, Client
from django.utils import timezone
from django.core.wsgi import get_wsgi_application
from django.test.client import RequestFactory
from django.urls import Resolver404
from backend.wsgi import application
from .models import Clothes, Size, User, Review, Comment
# asgi, wsgi testing
"""
class WSGITest(TestCase):

    urls = "regressiontests.wsgi.urls"
    def test_handles_request(self, rf: RequestFactory):

        with pytest.raises(Resolver404):
            application.resolve_request(rf.get("/"))

    def test_get_wsgi_application(self):

        application = get_wsgi_application()
        environ = RequestFactory()._base_environ(
            PATH_INFO="/",
            CONTENT_TYPE="text/html; charset=utf-8",
            REQUEST_METHOD="GET"
            )
        response_data = {}
        def start_response(status, headers):
            response_data["status"] = status
            response_data["headers"] = headers
        response = application(environ, start_response)
        self.assertEqual(response_data["status"], "404 Not Found")
        """


#models.py testing
class ClothesTestCase(TestCase):
    """clothes test case"""
    #setup
    def setUp(self):
        #create clothes
        clothes1 = Clothes.objects.create(
            name="와이드 데님 팬츠 (LIGHT BLUE)",
            style="street", brand="토피",
            price=36500,
            URL="https://www.musinsa.com/app/goods/858911",
            photo="https://image.msscdn.net/images/goods_img/20180914/858911/858911_6_500.jpg?t=20220628150414")
        clothes2 = Clothes.objects.create(
            name="ODPL 와이드 데님 핏 내츄럴크림진",
            style="dandy", brand="ORDER ARCHIVE",
            price=36900,
            URL="https://www.musinsa.com/app/goods/1477272",
            photo="https://image.msscdn.net/images/goods_img/20200608/1477272/1477272_1_500.jpg?t=20200608190923")

        #create clothes' sizes
        clothes1_size1 = Size.objects.create(named_size = "S", length="100", waist_size="38", thigh_size="30", calf_size="18", clothes=clothes1)
        clothes1_size2 = Size.objects.create(named_size = "M", length="101", waist_size="39", thigh_size="31", calf_size="19", clothes=clothes1)
        clothes1_size3 = Size.objects.create(named_size = "L", length="102", waist_size="40", thigh_size="32", calf_size="20", clothes=clothes1)

        clothes2_size1 = Size.objects.create(named_size = "S", length="95", waist_size="38", thigh_size="30", calf_size="18", clothes=clothes2)
        clothes2_size2 = Size.objects.create(named_size = "M", length="96", waist_size="39", thigh_size="32", calf_size="20", clothes=clothes2)
        clothes2_size3 = Size.objects.create(named_size = "L", length="97", waist_size="40", thigh_size="33", calf_size="21", clothes=clothes2)
        clothes2_size4 = Size.objects.create(named_size = "XL", length="98", waist_size="41", thigh_size="34", calf_size="22", clothes=clothes2)

        #create users
        user1 = User.objects.create(username="Oh", password="Oh123", nickname="Oh", length="103", waist_size="39", thigh_size="26", calf_size="16")
        user2 = User.objects.create(username="Doo", password="Doo123", nickname="Doo", length="107", waist_size="40", thigh_size="27", calf_size="18")
        user3 = User.objects.create(username="Bae", password="Bae123", nickname="Bae", length="106", waist_size="41", thigh_size="25", calf_size="17")

        #create reviews&scrap wanted clothes
        review1 = Review.objects.create(
            upload_time=timezone.now(),
            content="This is Oh's review on wide denim pants. I wanna scrap it",
            photo="imgsrc",
            reviewing_clothes=clothes1,
            uploaded_user=user1)
        
        user1.scrapped.add(clothes1)
        
        review2 = Review.objects.create(
            upload_time=timezone.now(),
            content="This is Doo's review on wide denim pants",
            photo="imgsrc",
            reviewing_clothes=clothes1,
            uploaded_user=user2)

        review3 = Review.objects.create(
            upload_time=timezone.now(),
            content="This is Doo's review on natural cream jean",
            photo="imgsrc",
            reviewing_clothes=clothes2,
            uploaded_user=user2)

        review4 = Review.objects.create(
            upload_time=timezone.now(),
            content="This is Bae's review on natural cream jean, I wanna scrap it",
            photo="imgsrc",
            reviewing_clothes=clothes2,
            uploaded_user=user3)

        user3.scrapped.add(clothes2)
        
        #create comment on reviews
        Comment.objects.create(
            upload_time=timezone.now(),
            content="Oh wanna put comment on review2",
            uploaded_user = user1,
            original_review = review2)

        Comment.objects.create(
            upload_time=timezone.now(),
            content="Doo wanna put comment on review4",
            uploaded_user = user2,
            original_review = review4)

        # Initialize frequently used member variables
        self.client = Client(enforce_csrf_checks=True)
        self.csrftoken = \
            self.client.get("/api/clothes/csrf_token/").cookies["csrftoken"].value

    #test functions
    def test_pants_size_count(self):
        self.assertEqual(Size.objects.all().count(), 7)

    def test_clothes_count(self):
        self.assertEqual(Clothes.objects.all().count(), 2)
    
    def test_user_count(self):
        self.assertEqual(User.objects.all().count(), 3)

    def test_review_count(self):
        self.assertEqual(Review.objects.all().count(), 4)

    def test_comment_count(self):
        self.assertEqual(Comment.objects.all().count(), 2)

    def test_csrf_token(self):
        response = self.client.get('/api/clothes/csrf_token/')
        self.assertEqual(response.status_code, 204)

    def test_signup(self):
        target_url = "/api/clothes/signup/"
        response = self.client.post(
            target_url,
            data={
                "username": "Jay",
                "password": "Jay123",
                "nickname": "Jay",
                "email": "jay123@snu.ac.kr",
                "length": 100,
                "waist_size": 100,
                "thigh_size": 100,
                "calf_size": 100,
            },
            content_type="application/json",
            HTTP_X_CSRFTOKEN=self.csrftoken)
        self.assertEqual(response.status_code, 200)

    def test_login(self):
        target_url = "/api/clothes/login/"
        response = self.client.post(
            target_url,
            data={
                "username": "",
                "password": "",
            },
            content_type="application/json",
            HTTP_X_CSRFTOKEN=self.csrftoken)
        self.assertEqual(response.status_code, 401)

        response = self.client.post(
            target_url,
            data={
                "username": "Oh",
                "password": "Oh123",
            },
            content_type="application/json",
            HTTP_X_CSRFTOKEN=self.csrftoken)
        self.assertEqual(response.status_code, 200)

    def test_main(self):
        response = self.client.get('/api/clothes/main/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('ODPL', response.content.decode())

    def test_userprofile(self):
        target_url = "/api/clothes/user/"
        userOh = User.objects.get(id=1)
        userOh.save()
        response = self.client.post(
            target_url,
            data={
                "username": "Oh",
                "password": "Oh123",
            },
            content_type="application/json",
            HTTP_X_CSRFTOKEN=self.csrftoken)
        self.assertEqual(response.status_code, 200)

    

