from django.conf import settings
from django.http import request
from django.http.response import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, redirect
from .models import *
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
        password = request.POST.get('password')

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
                
                msg = {'userID':user.get_username()}
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

@csrf_exempt
def updateUser(request):
    if request.user.is_authenticated:
        username = request.POST.get('userName')
        password = request.POST.get('password')
        user = request.user 
        if not User.objects.filter(username=username):
            user.username = username
            user.set_password(password)
            user.save()
            msg = 'success'
        else:
            msg = 'error'
            
            
    else:
        redirect('index.html')

    resp = {'msg': msg}
    return JsonResponse(resp)


@csrf_exempt
def deleteUser(request):
    if request.user.is_authenticated:
        try:
            User.objects.get(username=request.user.username).delete()
            msg = 'success'
        except Exception as e:
            msg = 'error'
            print(e)

    else:
        msg = 'error'
    resp = {'msg': msg}
    return JsonResponse(resp)

# category
@csrf_exempt
def createCategory(request):
    if request.user.is_authenticated:
        user = request.user
        categoryname = request.POST.get('categoryName')
        isPublic = request.POST.get('isPublic')

        counts = Categorie.objects.filter(categoryName=categoryname).count()

        if counts >= 1:
            categoryname += '({})'.format(counts)
        
        current_category = Categorie(categoryName=categoryname, isPublic= isPublic, userId= user)
        current_category.save()
        msg = 'success'

    else:
        msg = 'error'
        
    resp = {'msg': msg}
    return JsonResponse(resp)

@csrf_exempt
def deleteCategory(request):
    if request.user.is_authenticated:
        user = request.user
        categoryId = request.POST.get('categoryID')

        # auth if
        
        try:
            category = Categorie.objects.get(categoryID=categoryId)
            
            if str(category.userId) == str(user.username):
                category.delete()
                msg = 'success'
            else:
                msg = 'error'

        except Exception as e:
            msg = 'error'
            print(e)

    else:
        msg = 'error'

    resp = {'msg':msg}
    return JsonResponse(resp)


@csrf_exempt
def retrieveCategory(request):
    try:
        userid = request.GET.get('userID')
        user = get_object_or_404(User,username = userid)
        categories = Categorie.objects.filter(userId=user)
        resp_list = []
        for category in categories:
            resp_dict = {}
            if category.isPublic == True or request.user.username == userid:
                resp_dict['categoryID'] = category.categoryID
                resp_dict['categoryName'] = category.categoryName
                resp_dict['userId'] = category.userId.username
            resp_list.append(resp_dict)
        
        msg = resp_list
    except Exception as e:
        msg = 'error'
        print(e)

    resp = {'msg': msg}
    return JsonResponse(resp)
    
@csrf_exempt
def updateCategory(request):
    if request.user.is_authenticated:
        categoryId = request.POST.get('categoryID')
        categoryname = request.POST.get('categoryName')
        isPublic = request.POST.get('isPublic')
        print(categoryId)
        try:
            category = Categorie.objects.get(categoryID=categoryId)
            if category.userId == request.user:
                counts = Categorie.objects.filter(categoryName=categoryname,userId=request.user).count()

                if counts >= 1:
                    categoryname += '({})'.format(counts)
                
                category.categoryName = categoryname
                category.isPublic = isPublic
                category.save()
                msg = 'success'
            else:
                msg = 'error'

        except Exception as e:
            msg = 'error'
            print(e)

    else:
        msg = 'error'

    resp = {'msg':msg}
    return JsonResponse(resp)

# paper
@csrf_exempt
def createPaper(request):
    if request.user.is_authenticated:
        user = request.user
        categoryId = request.POST.get('categoryID')
        url = request.POST.get('url')
        title = request.POST.get('title')
        author = request.POST.get('author')
        description = request.POST.get('description')
        # Auth if 
        try:
            category = Categorie.objects.get(categoryID = categoryId)
            print(category.userId == user)
            if category.userId == user:
                # Have authority to change data
                current_paper = Paper(url = url, title = title, author = author, description = description, categoryID= category)
                current_paper.save()
                code = 0
                msg = 'success'
            else:
                code = 1
                msg = 'error'
        except Exception as e:
            code = 1
            msg = 'error'
            print(e)
    else:
        code = 1
        msg = 'error'

    resp = {'code':code, 'msg':msg}  
    return JsonResponse(resp)

@csrf_exempt
def deletePaper(request):
    if request.user.is_authenticated:
        user = request.user
        paperid = request.POST.get('paperID')
        # Auth if
        paper = get_object_or_404(Paper, paperId = paperid)
        category = paper.categoryID
        auser = category.userId
        if user == auser:
            paper.delete()
            code = 0
            msg ='success'
        else:
            code = 1
            msg = 'error'
    
    else:
        code = 1
        msg = 'error'

    resp = {'msg': msg}
    return JsonResponse(resp)

@csrf_exempt
def retrievePaper(request):
    categoryid = request.GET.get('categoryID')
    try:
        category = get_object_or_404(Categorie,categoryID = categoryid)
        papers = Paper.objects.filter(categoryID = category)
        resp_list = []
        for paper in papers:
            resp_dict = {}
            resp_dict['paperId'] = paper.paperId
            resp_dict['url'] = paper.url
            resp_dict['title'] = paper.title
            resp_dict['description'] = paper.description
            resp_dict['author'] = paper.author
            resp_list.append(resp_dict)
        msg = resp_list
        code = 0

    except Exception as e:
        msg = 'error'
        code = 1
        print(e)
    
    resp = {'code':code, 'msg':msg}
    return JsonResponse(resp)

@csrf_exempt
def updatePaper(request):
    if request.user.is_authenticated:
        user = request.user
        paperid = request.POST.get('paperID')
        url = request.POST.get('url')
        title = request.POST.get('title')
        author = request.POST.get('author')
        description = request.POST.get('description')
        # Auth if
        paper = get_object_or_404(Paper, paperId = paperid)
        category = paper.categoryID
        auser = category.userId
        if user == auser:
            paper.url = url
            paper.title = title
            paper.author = author
            paper.description = description
            paper.save()
            code = 0
            msg ='success'
        else:
            code = 1
            msg = 'error'
    else:
        code = 1
        msg = 'error'

    resp = {'code':code, 'msg': msg}
    return JsonResponse(resp)
# template
class TestPageView(TemplateView):
    if settings.ENABLE_TESTAPP == True:
        template_name = "testPage.html"
    else:
        template_name = "404.html"