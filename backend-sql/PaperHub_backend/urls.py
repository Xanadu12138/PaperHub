"""PaperHub_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from server import views
from django.views.generic.base import TemplateView

urlpatterns = [
    # Home page
    path('', TemplateView.as_view(template_name="index.html")),

    path('admin/', admin.site.urls),

    # admin page operation
    path('api/adminLogin', views.adminLogin),
    path('api/retrieveUser', views.retrieveUser),
    path('api/updateUser',views.updateUser),
    path('api/deleteUser',views.deleteUser),
    path('api/retrieveAllPaper',views.retrieveAllPaper),
    path('api/retrieveAllComment',views.retrieveAllComment),

    # User
    path('user/', views.TestPageView.as_view(), name='index'),
    path('signUp', views.signUp),
    path('signIn',views.signIn),
    path('signOut',views.signOut),

    # Category
    path('api/createCategory',views.createCategory),
    path('api/deleteCategory',views.deleteCategory),
    path('api/retrieveCategory',views.retrieveCategory),
    path('api/retrievePublicCategory',views.retrievePublicCategory),
    path('api/updateCategory',views.updateCategory),

    # paper
    path('api/createPaper',views.createPaper),
    path('api/deletePaper',views.deletePaper),
    path('api/retrievePaper',views.retrievePaper),
    path('api/updatePaper',views.updatePaper),
    # comment
    path('api/createComment',views.createComment),
    path('api/retrieveComment',views.retrieveComment),
    path('api/deleteComment',views.deleteComment),

    # backups
    path('api/backupDB',views.backupDB),
    path('api/retrieveBackup',views.retrieveBackup),
    path('api/recover',views.recover),
]
