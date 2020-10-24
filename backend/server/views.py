from django.conf import settings
from django.http import request
from django.http.response import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, redirect
from . import models
from django.utils.crypto import get_random_string
from django.contrib.auth.models import User, Group
from django.contrib.auth import authenticate, login, logout

from django.views.generic import TemplateView

from django.views.decorators.csrf import csrf_exempt
# Create your views here.

# 
@csrf_exempt
def signUp(request):
    # 注册
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password1')

        try:

            if User.objects.filter(username=username):
                # 判断用户是否已经注册存在
                msg = 'user already exist!'
                code = 1001
                resp = {'code': code, 'detail': msg}
            else:
                # 这是一个新用户
                user = User.objects.create_user(
                    username=username, password=password)
                # 这里返回一个元组
                user.save()
                code = 0
                msg = 'create success'
                resp = {'code': code, 'detail': msg}

        except Exception as e:
            code = 400
            msg = "signUp error"
            resp = {'code': code, 'detail': msg}
            print(e)

        return JsonResponse(resp)
    return HttpResponse("ERROR")

@csrf_exempt
def signIn(request):
    # 登陆
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        remember_me = request.POST.get('remember_me')
        print("get SignIn Post", username, password, remember_me)

        user = authenticate(username=username, password=password)

        try:
            if user is not None:
                # 存在该用户
                login(request, user)

                msg = 'Login success!'
                code = 0
                resp = {'code': code, 'detail': msg}
                response = JsonResponse(resp)

                # 判断用户是否勾选记住登录
                if remember_me == "on":
                    # 设置session有效期为14天（默认）
                    request.session.set_expiry(None)
                else:
                    # 如果没有记住，session在关闭浏览器后立刻失效
                    request.session.set_expiry(0)
                response.set_cookie(
                    key='username', value=user.username, max_age=3600*24*14)
                return response
            else:
                code = 100
                msg = 'email or password wrong!'
        except:
            code = 400
            msg = 'signIn error!'
        finally:
            resp = {'code': code, 'detail': msg}
            return JsonResponse(resp)
    

@csrf_exempt
def signOut(request):
    # 注销
    if request.method == 'POST':
        print("get SignOut Post")

        if request.user.is_authenticated:
            logout(request)

            msg = 'logout success!'
        else:
            msg = 'user is not login'

        resp = {'code': 0, 'detail': msg}
        response = JsonResponse(resp)
        response.delete_cookie('username')
        return response
    return HttpResponse("ERROR")


# template
class TestPageView(TemplateView):
    if settings.ENABLE_TESTAPP == True:
        template_name = "testPage.html"
    else:
        template_name = "404.html"