import json
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from django.contrib import auth
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from .models import Clothes, Size, User

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
        requestbody = json.loads(request.body)
        username=requestbody['username']
        password=requestbody['password']
        user = auth.authenticate(request, username=username, password=password)
        if user is not None:
            auth.login(request,user)
            response_dict = {"session_key":request.session.session_key,"username":user.username, "length":user.length}
            return JsonResponse(response_dict,status=200)
        else:
            response_dict = {"username": username}
            return HttpResponseBadRequest(response_dict,status=401)

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
def userprofile(request):
    if request.method == 'POST':
        requestbody = json.loads(request.body)
        username=requestbody['username']
        password=requestbody['password']
        user = auth.authenticate(request, username=username, password=password)
        auth.login(request,user)
        currentprofile = {"username":auth.get_user(request).get_username(),"length":auth.get_user(request).length,"waist_size":auth.get_user(request).waist_size,"thigh_size":auth.get_user(request).thigh_size,"calf_size":auth.get_user(request).calf_size}
        return JsonResponse(currentprofile, status=200)