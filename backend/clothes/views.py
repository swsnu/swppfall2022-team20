from django.http import HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from django.shortcuts import redirect, render
from django.contrib import auth
from django.views.decorators.csrf import csrf_exempt
import json
from json.decoder import JSONDecodeError
from .models import *

@csrf_exempt       
def signup(request):
#    if request.method == 'GET':
#        return render(request, "../../frontend/src/pages/Register/Register.tsx")
    if request.method == 'POST':
        user = Myuser.objects.create_user(username=request.POST.get('username'),
        password=request.POST.get('password'),
        nickname=request.POST.get('nickname'),
        email=request.POST.get('email'),
        chest_size=request.POST.get('chest_size'),
        waist_size=request.POST.get('waist_size'),
        thigh_size=request.POST.get('thigh_size'),
        calf_size=request.POST.get('calf_size'))
        user.save()

        auth.login(request,user)
        return JsonResponse(status=200)

def login(request):
#    if request.method == 'GET':
#        return render(request, "../../frontend/src/pages/Signup.tsx")
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = auth.authenticate(request, username=username, password=password)

        if user is not None:
            auth.login(request,user)
            return JsonResponse()
        #else->error

@csrf_exempt
#모든 상품리스트 반환
def main(request):
    clothesList = [clothes for clothes in Clothes.objects.all().values()]
    return JsonResponse(clothesList, safe=False)

#상품아이디가 {clothesId}인 상품의 리뷰리스트 반환
@csrf_exempt
def reviewsList(request, clothesId):
    reviewsList = Clothes.objects.get(id=clothesId).clothes_review
    return JsonResponse(reviewsList, safe=False)

# reviewsList함수와 중복 / reviewsList 제이슨 객체를 프론트에서 갖고 있다가 특정아이템
# 클릭시 그 특정 아이템을 프론트상에서 필터링하여 랜더링
#def review(request, clothesId, userName):
#    return HttpResponse(f"상품id가 {clothesId}이고 유저네임이 {userName}인 JSON 객체를 반환합니다")

#리뷰아이디가 {reviewId}인 리뷰리스트 제이슨 객체 반환
@csrf_exempt
def uploadedReviewsList(request, userId):
    uploadedReviewsList = User.objects.get(id=userId).uploaded_review
    return JsonResponse(uploadedReviewsList, safe=False)

#리뷰아이디가 {reviewId}인 리뷰에 코멘트를 추가
@csrf_exempt
def comment(request, reviewId, userId):
    if request.method == 'GET':
        comment_all_list = [comment for comment in Review.objects.get(id=reviewId).comment_uploaded]
        return JsonResponse(comment_all_list, safe=False)
    elif request.method == 'POST':
        try:
            body = request.body.decode()
            comment_content = json.loads(body)['content']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponseBadRequest()
        comment = Comment(content=comment_content, uploaded_user=userId,
        original_review = reviewId)
        comment.save()
        response_dict = {'id': comment.id}
        return JsonResponse(response_dict, status=201)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])

#유저아이디가 {userId}인 유저의 스크랩된 상품들의 리스트 반환
@csrf_exempt
def scrappedList(request, userId):
    scrappedList = User.objects.get(id=userId).scrapped
    return JsonResponse(scrappedList, safe=False)

#유저아이디가 {userId}인 유저의 스크랩된 상품에 상품을 추가
@csrf_exempt
def scrapItem(request, clothesId, userId):
    User.objects.get(id=userId).scrapped.add(Clothes.objects.get(id=clothesId))
    return JsonResponse(status=201)

