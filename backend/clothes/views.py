import json
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from django.shortcuts import redirect, render
from django.contrib import auth
from django.views.decorators.csrf import csrf_exempt
from .models import Myuser

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
            chest_size=requestbody['chest_size'],
            waist_size=requestbody['waist_size'],
            thigh_size=requestbody['thigh_size'],
            calf_size=requestbody['calf_size']
        )

        auth.login(request,user)
        response_dict = {"id":user.id}
        return JsonResponse(response_dict,status=200)

@csrf_exempt       
def login(request):
#    if request.method == 'GET':
#        return render(request, "../../frontend/src/pages/Signup.tsx")
    if request.method == 'POST':
        requestbody = json.loads(request.body)
        username=requestbody['username']
        password=requestbody['password']
        user = auth.authenticate(request, username=username, password=password)

        if user is not None:
            auth.login(request,user)
            response_dict = {"id": user.id}
            return JsonResponse(response_dict,status=200)
        else:
            response_dict = {"username": username}
            return HttpResponseBadRequest(response_dict,status=401)