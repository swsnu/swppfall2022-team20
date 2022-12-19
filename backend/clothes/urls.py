from django.contrib import admin
from django.urls import include, path
from . import views
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

urlpatterns = [
    path("csrf_token/", views.csrf_token),
    path("signup/", views.signup),
    path("login/", views.login),
    path('main/<str:user_id>/', views.main),
    path('profile/<str:user_id>/', views.profile),
    path('review/<str:user_id>/<int:clothes_id>/', views.review),
    path('analyze/<str:user_id>/<int:clothes_id>/', views.analyze),
    path('scrap/<str:user_id>/<int:clothes_id>/<str:is_scrap>/', views.scrap),
    path('scrapped/<str:user_id>/', views.scrapped_list),
    path('comment/<str:user_id>/<int:review_id>/', views.comment),
]
