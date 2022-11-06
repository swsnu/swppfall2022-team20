from django.http import JsonResponse
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