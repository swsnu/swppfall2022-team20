import json
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from django.contrib import auth
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from .models import Clothes, Size, User, Review

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
def main(request):
    clothes_data = []
    for clothes_general_data in Clothes.objects.all().values():
        clothes_id = clothes_general_data["id"]
        clothes_size_data = []
        for clothes_each_size_data in Size.objects.filter(clothes_id=clothes_id).values():
            clothes_each_size_data.pop("id")
            clothes_each_size_data.pop("clothes_id")
            clothes_size_data.append(clothes_each_size_data)
        clothes_general_data["size"] = clothes_size_data
        clothes_data.append(clothes_general_data)
    return JsonResponse(clothes_data, safe=False, status=200)
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

def review(request, clothes_id):
    if not (Clothes.objects.filter(id=clothes_id)).exists():
        return JsonResponse({"message": NO_CLOTHES}, status=404)
    review_list = [review for review in Review.objects.filter(reviewing_clothes_id=clothes_id).values()]
    if request.method == 'GET':
        return JsonResponse(review_list, safe=False, status=200)