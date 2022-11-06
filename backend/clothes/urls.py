from django.urls import path

from . import views

urlpatterns = [
    path('main/', views.main),
    path('reviews/<int:clothesId>/', views.reviewsList),
    #path('reviews/<int:clothesId>/<str:userName>/', views.review),
    path('reviews/read/<int:userId>/', views.uploadedReviewsList),
    path('comments/<int:reviewId>/', views.comment),
    path('scrapped/read/<int:userId>/', views.scrappedList),
    path('scrapped/put/<int:userId>/', views.scrapItem),
]