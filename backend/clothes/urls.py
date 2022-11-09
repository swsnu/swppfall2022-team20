from django.contrib import admin
from django.urls import include, path
from . import views
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

urlpatterns = [
    path("signup/", views.signup),
    path("login/", views.login),
    path('main/', views.main),
    path('user/', views.userprofile),
    path('reviews/<int:clothesId>/', views.reviewsList),
    #path('reviews/<int:clothesId>/<str:userName>/', views.review),
    path('reviews/read/<int:userId>/', views.uploadedReviewsList),
    path('comments/<int:reviewId>/', views.comment),
    path('scrapped/read/<int:userId>/', views.scrappedList),
    path('scrapped/put/<int:userId>/', views.scrapItem),
]