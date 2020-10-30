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

# 数据库驱动,多对象使用connections
from django.db import connection, connections
# 终端操作
import os
import time

# 管理员登录
@csrf_exempt
def adminLogin(request):
    if request.method == 'POST':
        adminID = request.POST.get('adminID')
        password = request.POST.get('password')

        try:
            cursor = connection.cursor()
            cursor.execute("select password from admin where adminID='%s';" % (adminID))
            row = cursor.fetchone()
            row = row[0]
            cursor.close()

            if row != password:
                # 密码错误
                msg = 'wrong admin password!'
                code = 1001
                resp = {'code': code, 'detail': msg}
            else:
                # 登录成功
                code = 0
                msg = 'admin login success'
                resp = {'code': code, 'detail': msg}

        except Exception as e:
            code = 400
            msg = "adminLogin error"
            resp = {'code': code, 'detail': msg}
            print(e)

        return JsonResponse(resp)
    return HttpResponse("ERROR")

# 查找所有用户
@csrf_exempt
def retrieveUser(request):
    if request.method == 'GET':
        try:
            cursor = connection.cursor()
            cursor.execute("select * from users;")
            rows = cursor.fetchall()
            cursor.close()

            msg = []
            key = ['userID', 'password']
            for row in rows:
                msg.append(dict(zip(key,row)))

            resp = {'msg': msg}

        except Exception as e:
            code = 400
            msg = "adminLogin error"
            resp = {'code': code, 'detail': msg}
            print(e)

        return JsonResponse(resp)
    return HttpResponse("ERROR")

# 更新指定用户
@csrf_exempt
def updateUser(request):
    if request.method == 'POST':
        userID = request.POST.get('userID')
        password = request.POST.get('password')

        try:
            cursor = connections['admin'].cursor()
            cursor.execute("set session transaction isolation level serializable;")
            cursor.execute("set @@autocommit=0;")
            cursor.execute("start transaction;")
            cursor.execute("update users set password=%s where userID='%s';" % (password, userID))
            cursor.execute("commit;")

            cursor.close()

            msg = userID + " update success"
            resp = {'msg': msg}

        except Exception as e:
            code = 400
            msg = "updateUser error"
            resp = {'code': code, 'detail': msg}
            print(e)

        return JsonResponse(resp)
    return HttpResponse("ERROR")

# 删除指定用户
@csrf_exempt
def deleteUser(request):
    if request.method == 'POST':
        userID = request.POST.get('userID')

        try:
            cursor = connections['admin'].cursor()
            cursor.execute("set session transaction isolation level serializable;")
            cursor.execute("set @@autocommit=0;")
            cursor.execute("start transaction;")
            cursor.execute("delete from users where userID='%s';" % (userID))
            cursor.execute("commit;")

            cursor.close()
            msg = userID + " delete success"
            resp = {'msg': msg}

        except Exception as e:
            code = 400
            msg = "deleteUser error"
            resp = {'code': code, 'detail': msg}
            print(e)

        return JsonResponse(resp)
    return HttpResponse("ERROR")


# 查找所有论文
@csrf_exempt
def retrieveAllPaper(request):
    if request.method == 'GET':

        try:
            cursor = connection.cursor()
            cursor.execute("select userID, categoryName, title, url, paperID \
                            from categories \
                            join papers on categories.categoryID=papers.categoryID;")

            rows = cursor.fetchall()
            cursor.close()

            msg = []
            key = ['userID', 'categoryName', 'title', 'url', 'paperID']
            for row in rows:
                msg.append(dict(zip(key,row)))
        
            resp = {'msg': msg}

        except Exception as e:
            code = 400
            msg = "retrieveAllPaper error"
            resp = {'code': code, 'detail': msg}
            print(e)

        return JsonResponse(resp)
    return HttpResponse("ERROR")


# 查找所有评论
@csrf_exempt
def retrieveAllComment(request):
    if request.method == 'GET':

        try:
            cursor = connection.cursor()
            cursor.execute("select categoryName, content, comments.userID, date, commentID \
                            from categories \
                            join comments on categories.categoryID=comments.categoryID;")

            rows = cursor.fetchall()
            cursor.close()

            msg = []
            key = ['categoryName', 'content', 'userID', 'date', 'commentID']
            for row in rows:
                msg.append(dict(zip(key,row)))
        
            resp = {'msg': msg}

        except Exception as e:
            code = 400
            msg = "retrieveAllPaper error"
            resp = {'code': code, 'detail': msg}
            print(e)

        return JsonResponse(resp)
    return HttpResponse("ERROR")


@csrf_exempt
def signUp(request):
    # 注册
    if request.method == 'POST':
        userID = request.POST.get('userID')
        password = request.POST.get('password')

        try:
            cursor = connection.cursor()
            cursor.execute("insert into users values ('%s', '%s');" % (userID, password))
            cursor.close()

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

# 登陆
@csrf_exempt
def signIn(request):
    if request.method == 'POST':
        userID = request.POST.get('userID')
        password = request.POST.get('password')

        try:
            cursor = connection.cursor()
            cursor.execute("select password from users where userID='%s';" % (userID))

            row = cursor.fetchone()
            row = row[0]

            cursor.close()

            if row != password:
                # 密码错误
                msg = 'wrong user password!'
                code = 1001
                resp = {'code': code, 'detail': msg}
            else:
                # 登录成功
                code = 0
                msg = 'user login success'
                resp = {'code': code, 'detail': msg}
                # 设置cookie
                response = JsonResponse(resp)
                response.set_cookie(
                        key='userID', value=userID, max_age=3600*24*14)
                return response

        except Exception as e:
            code = 400
            msg = "signIn error"
            resp = {'code': code, 'detail': msg}
            print(e)
            return JsonResponse(resp)
    return HttpResponse("ERROR")
    
# 注销
@csrf_exempt
def signOut(request):
    if request.method == 'POST':

        msg = 'logout success!'
        resp = {'code': 0, 'detail': msg}

        response = JsonResponse(resp)
        response.delete_cookie('userID')
        return response
    return HttpResponse("ERROR")

## 分类
@csrf_exempt
def createCategory(request):
    if request.method == 'POST':
        userID = request.COOKIES.get('userID')
        categoryName = request.POST.get('categoryName')
        isPublic = request.POST.get('isPublic')
        isPublic = 1 if isPublic == 'True' else 0 # 转化为TINYINT
        try:
            cursor = connection.cursor()
            # 防重名
            while True:
                cursor.execute("select count(*) from categories where categoryName='%s';" % (categoryName))
                counts = cursor.fetchone()[0]

                if counts >= 1:
                    categoryName += '({})'.format(counts)
                if counts == 0:
                    break
            
            # 插入新分类
            cursor.execute("insert into categories values (null, '%s', %d, '%s');"
                                % (categoryName, isPublic, userID))

            cursor.close()
            msg = 'success'
        except Exception as e:
            msg = 'error'
            print(e)
    else:
        msg = 'error'
        
    resp = {'msg': msg}
    return JsonResponse(resp)


@csrf_exempt
def deleteCategory(request):
    if request.method == 'POST':
        userID = request.COOKIES.get('userID')
        categoryID = request.POST.get('categoryID')
        
        try:
            cursor = connection.cursor()
            cursor.execute("delete from categories where categoryID=%s;" % (categoryID))

            cursor.close()
            msg = 'success'

        except Exception as e:
            msg = 'error'
            print(e)

    else:
        msg = 'error'

    resp = {'msg':msg}
    return JsonResponse(resp)


@csrf_exempt
def retrieveCategory(request):
    if request.method == 'GET':
        userID = request.COOKIES.get('userID')
        try:
            cursor = connection.cursor()
            cursor.execute("select categoryID, categoryName, isPublic \
                            from categories where userID='%s';" % (userID))
            rows = cursor.fetchall()
            rows = list(rows)
            cursor.close()
            # 处理isPublic数据
            for row in rows:
                rows[rows.index(row)] = list(row)
            for row in rows:
                row[2] = "true" if row[2] == 1 else "false"
            # list2dict
            msg = []
            key = ['categoryID', 'categoryName', 'isPublic']
            for row in rows:
                msg.append(dict(zip(key,row)))

        except Exception as e:
            msg = 'error'
            print(e)
    else:
        msg = 'error'
    resp = {'msg': msg}
    return JsonResponse(resp)


@csrf_exempt
def retrievePublicCategory(request):
    if request.method == 'GET':
        try:
            cursor = connection.cursor()
            cursor.execute("select categoryName, categoryID, userID \
                            from categories where isPublic=1;")
            rows = cursor.fetchall()
            rows = list(rows)
            cursor.close()

            # list2dict
            msg = []
            key = ['categoryName', 'categoryID', 'userID']
            for row in rows:
                msg.append(dict(zip(key,row)))
            
        except Exception as e:
            msg = 'error'
            print(e)
    else:
        msg = 'error'
    resp = {'msg':msg}
    return JsonResponse(resp)
    

@csrf_exempt
def updateCategory(request):
    if request.method == 'POST':
        categoryID = request.POST.get('categoryID')
        categoryName = request.POST.get('categoryName')
        isPublic = request.POST.get('isPublic')
        isPublic = 1 if isPublic == 'True' else 0 # 转化为TINYINT
        try:
            cursor = connection.cursor()
            
            cursor.execute("update categories set categoryName='%s', isPublic=%d where \
                            categoryID=%s;"
                                % (categoryName, isPublic, categoryID))

            cursor.close()
            msg = 'success'

        except Exception as e:
            msg = 'error'
            print(e)

    else:
        msg = 'error'

    resp = {'msg':msg}
    return JsonResponse(resp)


## paper
@csrf_exempt
def createPaper(request):
    if request.method == 'POST':
        categoryID = request.POST.get('categoryID')
        url = request.POST.get('url')
        title = request.POST.get('title')
        author = request.POST.get('author')
        description = request.POST.get('description')
        try:
            cursor = connection.cursor()
            cursor.execute("insert into papers values (null, '%s', '%s', '%s', '%s', %s);"
                                % (url, title, author, description, categoryID))

            cursor.close()
            msg = 'success'
        except Exception as e:
            msg = 'error'
            print(e)
    else:
        code = 1
        msg = 'error'

    resp = {'msg':msg}  
    return JsonResponse(resp)


@csrf_exempt
def deletePaper(request):
    if request.method == 'POST':
        paperID = request.POST.get('paperID')
        try:
            cursor = connection.cursor()
            cursor.execute("delete from papers where paperID=%s;" % (paperID))

            cursor.close()
            msg = 'success'
        except Exception as e:
            msg = 'error'
            print(e)
    else:
        code = 1
        msg = 'error'

    resp = {'msg':msg}  
    return JsonResponse(resp)


@csrf_exempt
def retrievePaper(request):
    if request.method == 'GET':
        categoryID = request.GET.get('categoryID')
        try:
            cursor = connection.cursor()
            cursor.execute("select paperID, url, title, author, description \
                            from papers where categoryID=%s;" % (categoryID))
            rows = cursor.fetchall()
            rows = list(rows)
            cursor.close()
            # list2dict
            msg = []
            key = ['paperID', 'url', 'title', 'author', 'description']
            for row in rows:
                msg.append(dict(zip(key,row)))
            
        except Exception as e:
            msg = 'error'
            print(e)
    else:
        code = 1
        msg = 'error'

    resp = {'msg':msg}  
    return JsonResponse(resp)


@csrf_exempt
def updatePaper(request):
    if request.method == 'POST':
        paperID = request.POST.get('paperID')
        url = request.POST.get('url')
        title= request.POST.get('title')
        author= request.POST.get('author')
        description = request.POST.get('description')

        try:
            cursor = connection.cursor()
            cursor.execute("update papers set url='%s', title='%s', author='%s', description='%s' \
                            where paperID=%s;" % (url, title, author, description, paperID))

            cursor.close()
            msg = 'success'

        except Exception as e:
            msg = 'error'
            print(e)

    else:
        msg = 'error'

    resp = {'msg':msg}
    return JsonResponse(resp)


# comment
@csrf_exempt
def createComment(request):
    if request.method == 'POST':
        userID = request.COOKIES.get('userID')
        content = request.POST.get('content')
        categoryID = request.POST.get('categoryID')
     
        try:
            cursor = connection.cursor()
            cursor.execute("insert into comments (content, userID, categoryID) \
                                values ('%s', '%s', %s);"
                                % (content, userID, categoryID))

            cursor.close()
            msg = 'success'
        except Exception as e:
            msg = 'error'
            print(e)
    else:
        code = 1
        msg = 'error'

    resp = {'msg':msg}  
    return JsonResponse(resp)

@csrf_exempt
def retrieveComment(request):
    if request.method == 'GET':
        categoryID = request.GET.get('categoryID')
        try:
            cursor = connection.cursor()
            cursor.execute("select content, userID, date \
                            from comments where categoryID=%s;" % (categoryID))
            rows = cursor.fetchall()
            rows = list(rows)
            cursor.close()
            # list2dict
            msg = []
            key = ['content', 'userID', 'date']
            for row in rows:
                msg.append(dict(zip(key,row)))
            
        except Exception as e:
            msg = 'error'
            print(e)
    else:
        code = 1
        msg = 'error'

    resp = {'msg':msg}  
    return JsonResponse(resp)


@csrf_exempt
def deleteComment(request):
    if request.method == 'POST':
        commentID = request.POST.get('commentID')
        try:
            cursor = connection.cursor()
            cursor.execute("delete from comments where commentID=%s;" % (commentID))

            cursor.close()
            msg = 'success'
        except Exception as e:
            msg = 'error'
            print(e)
    else:
        code = 1
        msg = 'error'

    resp = {'msg':msg}  
    return JsonResponse(resp)


# 数据库备份
@csrf_exempt
def backupDB(request):
    if request.method == 'POST':
        try:
            timeStr = time.strftime("%Y-%m-%d-%H:%M:%S", time.localtime())
            path = "backup/"
            fileName = path + timeStr + "backup_DBPH.sql"
            command = "mysqldump -u'adminOfDBPH' -p123 --databases DBPH > " + fileName

            # 记录 - 先记录，防止备份中的没有当前记录的数据
            cursor = connections['admin_backup'].cursor()
            # 序列化级别隔离
            cursor.execute("set session transaction isolation level serializable;")
            cursor.execute("set @@autocommit=0;")
            cursor.execute("start transaction;")
            cursor.execute("insert into backups (path) values ('%s');" % (fileName))
            cursor.execute("commit;")

            cursor.close()
            # 系统调用做备份
            os.system(command)

            msg = 'success'
        except Exception as e:
            msg = 'error'
            print(e)
    else:
        code = 1
        msg = 'error'

    resp = {'msg':msg}  
    return JsonResponse(resp)

@csrf_exempt
def retrieveBackup(request):
    if request.method == 'GET':
        try:
            cursor = connections['admin_backup'].cursor()
            cursor.execute("set session transaction isolation level serializable;")
            cursor.execute("set @@autocommit=0;")
            cursor.execute("start transaction;")
            cursor.execute("select backupID, date from backups;")
            rows = cursor.fetchall()
            cursor.execute("commit;")
            cursor.close()
            # list2dict
            msg = []
            key = ['backupID', 'date']
            for row in rows:
                msg.append(dict(zip(key,row)))

        except Exception as e:
            msg = 'error'
            print(e)
    else:
        code = 1
        msg = 'error'

    resp = {'msg':msg}  
    return JsonResponse(resp)

@csrf_exempt
def recover(request):
    if request.method == 'POST':
        backupID = request.POST.get('backupID')
        try:
            # 找到路径
            cursor = connections['admin_backup'].cursor()
            cursor.execute("set session transaction isolation level serializable;")
            cursor.execute("set @@autocommit=0;")
            cursor.execute("start transaction;")
            cursor.execute("select path from backups where backupID=%s;" % (backupID))
            fileName = cursor.fetchone()[0]
            cursor.execute("commit;")

            cursor.close()
            # 恢复
            command = "mysql -u'adminOfDBPH' -p123 DBPH < " + fileName
            os.system(command)
            msg = 'success'
        except Exception as e:
            msg = 'error'
            print(e)
    else:
        msg = 'error'

    resp = {'msg':msg}  
    return JsonResponse(resp)
    
    

# template
class TestPageView(TemplateView):
    if settings.ENABLE_TESTAPP == True:
        template_name = "testPage.html"
    else:
        template_name = "404.html"