import json
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from django.shortcuts import redirect, render
from django.contrib import auth 
from django.views.decorators.csrf import csrf_exempt
import json
from json.decoder import JSONDecodeError
from .models import *

    # Create your views here.
@csrf_exempt       
def signup(request):
#    if request.method == 'GET':
#        return render(request, "../../frontend/src/pages/Register/Register.tsx")
    if request.method == 'POST':
        requestbody = json.loads(request.body)
        user = Myuser.objects.create_user(
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
#    if request.method == 'GET':
#        return render(request, "../../frontend/src/pages/Signup.tsx")
    if request.method == 'POST':
        requestbody = json.loads(request.body)
        print(1)
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

@csrf_exempt
#모든 상품리스트 반환
def main(request):
    clothesList = [clothes for clothes in Clothes.objects.all().values()]
    return JsonResponse(clothesList, safe=False, status=200)

@csrf_exempt
def userprofile(request):
#    if request.method == "GET":
    requestbody = json.loads(request.body)
    username=requestbody['username']
    password=requestbody['password']
    user = auth.authenticate(request, username=username, password=password)
    auth.login(request,user)
    currentprofile = {"username":auth.get_user(request).get_username(),"length":auth.get_user(request).length,"waist_size":auth.get_user(request).waist_size,"thigh_size":auth.get_user(request).thigh_size,"calf_size":auth.get_user(request).calf_size}
    return JsonResponse(currentprofile)
    