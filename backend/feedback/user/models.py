from django.db import models

# Create your models here.
import uuid
from django.db import models

class institute(models.Model):
    '''
    This is the institute model. This will contain data of institutes against/for which feedbacks are given. The records in this models will be created internally by the company
    '''
    name=models.CharField(max_length=100)
    institute_email=models.EmailField(default="abcd@gmail.com")
    admin_id=models.IntegerField(null=True,blank=True)
    date_time=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name   
class admin(models.Model):
    '''
    This is the admin model. This will contain data of admins of respective institutes.
    '''
    institute=models.ForeignKey(institute,to_field="id",on_delete=models.CASCADE)
    first_name=models.CharField(max_length=30)
    last_name=models.CharField(max_length=30)
    email=models.EmailField(unique=True)
    password=models.CharField(max_length=40)
    date_time=models.DateTimeField(auto_now_add=True)
    auth_token=models.UUIDField(null=True,default="",blank=True)

    def __str__(self):
        return self.first_name + self.last_name    

class student(models.Model):
    '''
    This is the student model. This will contain data of students of respective institutes. Only admins are allowed to create student records.
    '''
    institute=models.ForeignKey(institute,to_field="id",on_delete=models.CASCADE)
    admin_id=models.ForeignKey(admin,on_delete=models.SET_NULL,null=True)
    first_name=models.CharField(max_length=30)
    last_name=models.CharField(max_length=30)
    course=models.IntegerField(default=0)
    email=models.EmailField(unique=True)
    password=models.CharField(max_length=40)
    date_time=models.DateTimeField(auto_now_add=True)
    auth_token=models.UUIDField(null=True)    
