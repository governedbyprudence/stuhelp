from django.db import models

from user.models import  admin, institute 

class course(models.Model):
    degree_name = models.CharField(max_length=10)
    course_name = models.CharField(max_length=10)
    year = models.IntegerField(default=1)
    sem = models.IntegerField(default=1)
    institute=models.ForeignKey(institute,on_delete=models.CASCADE)
    admin=models.ForeignKey(admin,on_delete=models.SET_NULL,null=True)
    date_time=models.DateTimeField(auto_now_add=True)

class teacher(models.Model):
    name = models.CharField(max_length=50)
    institute=models.ForeignKey(institute,on_delete=models.CASCADE)
    admin=models.ForeignKey(admin,on_delete=models.SET_NULL,null=True)
    def __str__(self):
        return self.name
class subject(models.Model):
    name = models.CharField(max_length=20)
    institute=models.ForeignKey(institute,on_delete=models.CASCADE)
    admin=models.ForeignKey(admin,on_delete=models.SET_NULL,null=True)
    course = models.ForeignKey(course,on_delete=models.CASCADE)
    teacher = models.ForeignKey(teacher,on_delete=models.SET_NULL,null=True)

