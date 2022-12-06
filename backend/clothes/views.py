import json
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from django.contrib import auth
from django.forms.models import model_to_dict
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from .models import Clothes, Size, User, Review
from . import recommender

NO_USER = "존재하지 않는 유저입니다."
NO_CLOTHES = "존재하지 않는 상품입니다."

@ensure_csrf_cookie
def csrf_token(request):
    if request.method == "GET":
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(["GET"])
    # Create your views here.
@csrf_exempt
def signup(request):
    if request.method == 'POST':
        requestbody = json.loads(request.body)
        user = User.objects.create_user(
            username=requestbody['username'],
            password=requestbody['password'],
            nickname=requestbody['nickname'],
            email=requestbody['email'],
            length=requestbody['length'],
            waist_size=requestbody['waist_size'],
            thigh_size=requestbody['thigh_size'],
            calf_size=requestbody['calf_size']
        )

        auth.login(request,user)
        response_dict = {"session_id":request.session.session_key,"username":auth.get_user(request).get_username()}
        return JsonResponse(response_dict,status=200)
        
@csrf_exempt
def login(request):
    if request.method == 'POST':
        requestbody = json.loads(request.body.decode())
        username=requestbody['username']
        password=requestbody['password']
        user = auth.authenticate(request, username=username, password=password)
        if user is not None:
            auth.login(request,user)
            response_dict = {"session_key":request.session.session_key,"username":user.username, "length":user.length}
            return JsonResponse(response_dict,status=200)
        else:
            response_dict = {"username":username}
            return JsonResponse(response_dict,status=401)

#모든 상품리스트 반환
@csrf_exempt
def main(request, user_id):
    if not (User.objects.filter(username=user_id)).exists():
        return JsonResponse({"message": NO_USER}, status=404)
    user = User.objects.get(username=user_id)
    recommended_list = []
    prev_clothes = {"name": "name"}
    for size in user.recommended.all():
        if prev_clothes["name"] != size.clothes.name:
            recommended_list.append(prev_clothes)
            clothes = size.clothes
            clothes_data = model_to_dict(clothes)
            clothes_data = {**clothes_data, "named_size":[size.named_size]}
            prev_clothes = clothes_data
        else:
            size_list = prev_clothes["named_size"]
            size_list.append(size.named_size)
            prev_clothes["named_size"] = size_list
    recommended_list.pop(0)
    return JsonResponse(recommended_list, safe=False)

@csrf_exempt
def profile(request, user_id):
    if not (User.objects.filter(username=user_id)).exists():
        return JsonResponse({"message": NO_USER}, status=404)
    user = User.objects.get(username=user_id)
    if request.method == 'GET':
        return JsonResponse(
            {
                "username": user.username,
                "password": user.password,
                "nickname": user.nickname,
                "email": user.email,
                "length": user.length,
                "waist_size": user.waist_size,
                "thigh_size": user.thigh_size,
                "calf_size": user.calf_size,
                })

def review(request, user_id, clothes_id):
    if not (Clothes.objects.filter(id=clothes_id)).exists():
        return JsonResponse({"message": NO_CLOTHES}, status=404)
    if not (User.objects.filter(username=user_id)).exists():
        return JsonResponse({"message": NO_USER}, status=404)
    user = User.objects.get(username=user_id)
    clothes_reviews = Review.objects.filter(reviewing_clothes_id=clothes_id)
    matched_reviews = clothes_reviews.filter(recommended_user = user)
    review_list = [review for review in matched_reviews.values()]
    if request.method == 'GET':
        return JsonResponse(review_list, safe=False, status=200)

def analyze(request, user_id, clothes_id):
    if not (Clothes.objects.filter(id=clothes_id)).exists():
        return JsonResponse({"message": NO_CLOTHES}, status=404)
    if not (User.objects.filter(username=user_id)).exists():
        return JsonResponse({"message": NO_USER}, status=404)
    user = User.objects.get(username=user_id)
    clothes_sizes = user.recommended.filter(clothes_id=clothes_id)
    analysis_list = []
    for clothes_size in clothes_sizes:
        analysis = recommender.analyze(clothes_size, user)
        analysis_list.append(analysis)
    if request.method == 'GET':
        return JsonResponse(analysis_list, safe=False, status=200)