from django.db import models

from user.models import student
# Create your models here.
class feed_back(models.Model):
    '''
    This is the database model that takes in the feedback records
    '''
    feed_back_type=models.CharField(max_length=10)
    feed_back_text=models.TextField(null=False)
    date_time=models.DateTimeField(auto_now_add=True)
    feed_back_score=models.IntegerField(default=0)
    feed_back_by=models.ForeignKey(student,on_delete=models.SET_NULL,null=True)
    feed_back_to=models.IntegerField()
    def __str__(self):
        return str(self.date_time)