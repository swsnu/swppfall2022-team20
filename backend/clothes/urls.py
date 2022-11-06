from django.contrib import admin
from django.urls import include, path
from . import views

urlpatterns = [
    path("signup/", views.signup),
    path("login/", views.login),
]