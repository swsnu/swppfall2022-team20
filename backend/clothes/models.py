"""
models module for stylestagram app
"""
from django.db import models
from django.contrib.auth.models import AbstractUser

class Clothes(models.Model):
    name = models.CharField(max_length=30)
    style = models.CharField(max_length=30)
    brand = models.CharField(max_length=50)
    #color
    price = models.IntegerField()
    URL = models.CharField(max_length=200)
    #analytics
    photo = models.CharField(max_length=200) #사진의 저장 경로

    def __str__(self):
        return self.name

class Size(models.Model):
    named_size = models.CharField(max_length=30)
    length = models.IntegerField()
    waist_size = models.IntegerField()
    thigh_size = models.IntegerField()
    calf_size = models.IntegerField()
    clothes = models.ForeignKey(
        Clothes, #style 추가시 수정
        on_delete=models.CASCADE,
        related_name = "size_list",
    )

#class color

class User(AbstractUser):
    nickname = models.CharField(max_length=50)
    length = models.IntegerField(default=0)
    waist_size = models.IntegerField(default=0)
    thigh_size = models.IntegerField(default=0)
    calf_size = models.IntegerField(default=0)

    purchased = models.ManyToManyField(
        Clothes,
        related_name = "user_purchased",
    )

    scrapped = models.ManyToManyField(
        Clothes,
        related_name = "user_scrapped",
    )

    recommended = models.ManyToManyField(
        Size,
        related_name = "user_recommended",
    )


    def __str__(self):
        return self.username

class Review(models.Model):
    upload_time = models.TimeField()
    content = models.TextField()
    photo = models.CharField(max_length=200, blank=True) #사진의 저장 경로
    reviewing_clothes = models.ForeignKey(
        Clothes,
        on_delete=models.CASCADE,
        related_name = "clothes_review",
    )
    uploaded_user = models.ForeignKey(
        User,
        on_delete=models.CASCADE, #User가 삭제되는 경우
        related_name = "uploaded_review",
    )
    recommended_user = models.ManyToManyField(
        User,
        related_name = "recommended_review",
    )

class Comment(models.Model):
    upload_time = models.TimeField()
    content = models.TextField()
    uploaded_user = models.ForeignKey(
        User,
        on_delete=models.CASCADE, #User가 삭제되는 경우
        related_name = "uploaded_comments",
    )
    original_review = models.ForeignKey(
        Review,
        on_delete=models.CASCADE,
        related_name='comment_list',
    )
    