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
]