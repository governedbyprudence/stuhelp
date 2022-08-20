from rest_framework import status
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
import json
from feed.final import score_predictor
from user.models import student
from .models import feed_back
from .serializers import feedback_serializer
import os
@csrf_exempt

def feed_back_view(request):
    '''
    This function handles the feed back submit, predicts the score based on NLP and uploads the record in the database
    '''
    if request.method=="GET":
        return JsonResponse({"message":"GET requests not allowed"})
    elif request.method=="POST":
        print("in post")
        data=json.loads(request.body.decode("utf-8"))
        try:
            print(data)
            feedback_type=data["type"]
            feedback_text=data["text"]
            feedback_to=data["entity_id"]
            feedback_by=data["id"]
            student_ob = student.objects.get(id=feedback_by)
            score= int(score_predictor(feedback_text)*100)
            dataset=feed_back(  feed_back_type=feedback_type,
                                feed_back_text=feedback_text,
                                feed_back_by=student_ob,
                                feed_back_to=feedback_to,
                                feed_back_score=score)
            dataset.save()
            return JsonResponse({"message":"Successfully registered"},status=status.HTTP_200_OK)        
        except Exception as e :
            print(e)
            return JsonResponse({"message":"Something wrong with data"},status=status.HTTP_400_BAD_REQUEST)
        