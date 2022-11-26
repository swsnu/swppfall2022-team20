"""
admin module for stylestagram app
"""
from django.contrib import admin
from .models import Size, Clothes, User, Review, Comment

# Register your models here.

admin.site.register(Size)
admin.site.register(Clothes)
admin.site.register(User)
admin.site.register(Review)
admin.site.register(Comment)
