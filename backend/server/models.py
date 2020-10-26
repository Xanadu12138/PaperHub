from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Categorie(models.Model):
    categoryID = models.IntegerField(primary_key=True, auto_created=True)
    categoryName = models.CharField(max_length=100, blank=False)
    isPublic = models.BooleanField(blank=False)
    userId = models.ForeignKey(User,on_delete= models.CASCADE)
    
    def __str__(self):
        return '%d' % self.categoryID

class Paper(models.Model):
    paperId = models.IntegerField(primary_key=True, auto_created= True)
    url = models.URLField(max_length=100, blank=False)
    title = models.CharField(max_length=100, blank= False)
    author = models.CharField(max_length=50, blank= False)
    description = models.CharField(max_length=250, blank= False)
    categoryID = models.ForeignKey(Categorie,on_delete=models.CASCADE)

    def __str__(self):
        return '%d' % self.paperId

class Comment(models.Model):
    commentId = models.IntegerField(primary_key=True, auto_created=True)
    userName = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(max_length=500)
    date = models.DateField(auto_now=True)
    categoryID = models.ForeignKey(Categorie, on_delete=models.CASCADE)
    
    def __str__(self):
        return '%d' % self.commentId