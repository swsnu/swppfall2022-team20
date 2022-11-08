from django.contrib import admin
from .models import Pants_size, Clothes, Myuser, Review, Comment

# Register your models here.

admin.site.register(Pants_size)
admin.site.register(Clothes)
admin.site.register(Myuser)
admin.site.register(Review)
admin.site.register(Comment)