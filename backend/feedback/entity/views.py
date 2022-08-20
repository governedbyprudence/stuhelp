import uuid
from django.shortcuts import render
from django.http import JsonResponse
from .models import course, institute, subject, teacher
from user.models import admin,student
from django.views.decorators.csrf import csrf_exempt
from .serializers import course_serializer, subject_serializer, teacher_serializer
from rest_framework import status
import json
# Create your views here.
@csrf_exempt
def course_view(request):
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))
        if "auth_token" in data.keys():
            admin_id = data["admin_id"]
            try:
                admin_record = admin.objects.get(id=admin_id)
                auth_token = uuid.UUID(data["auth_token"])
                if auth_token.hex == admin_record.auth_token.hex:
                    degree_name = data["degree_name"]
                    course_name = data["course_name"]
                    year  = data["year"]
                    sem = data["sem"]
                    institute = admin_record.institute
                    course_record = course( sem=sem,
                                            year=year,
                                            course_name=course_name,
                                            degree_name=degree_name,
                                            institute=institute,
                                            admin=admin_record)
                    course_record.save()
                    return JsonResponse({"message":"Course registered"})
                else:
                    return JsonResponse({"message":"Wrong auth token"})
            except admin.DoesNotExist:
                return JsonResponse({"message":"Wrong admin id"})
    elif request.method == "GET":
        admin_id = request.GET.get("admin_id")
        try:
            data = course.objects.filter(admin=admin_id)
            serializer = course_serializer(data,many=True)
            return JsonResponse({"data":serializer.data},safe=False)        
        except course.DoesNotExist:
            return JsonResponse({"message":"Wrong admin id or course does not exist"})
    elif request.method=="DELETE":
        data = json.loads(request.body.decode("utf-8"))
        print(data)
        if "auth_token" in data.keys():
            admin_id = data["admin_id"]
            try:
                admin_record = admin.objects.get(id=admin_id)
                auth_token = uuid.UUID(data["auth_token"])
                if auth_token.hex == admin_record.auth_token.hex:
                    try:
                        course_record=course.objects.get(id=data["course_id"])
                        course_record.delete()
                        return JsonResponse({"message":"Course deleted"})
                    except course.DoesNotExist:
                        return JsonResponse({"message":"Course does not exist"})
                else:
                    return JsonResponse({"message":"Wrong auth token"})
            except admin.DoesNotExist:
                    return JsonResponse({"message":"Wrong admin id"})

def course_view_single(request):
    if request.method == "GET":
        admin_id = request.GET.get("admin_id")
        course_id = request.GET.get("course_id")
        print(admin_id)
        try:
            data = course.objects.get(id=course_id,admin=admin_id)
            serializer = course_serializer(data)
            return JsonResponse({"data":serializer.data})        
        except course.DoesNotExist:
            return JsonResponse({"message":"Wrong admin id or course does not exist"})
    return JsonResponse({"message":"Only get Requests"})
@csrf_exempt
def teacher_view(request):
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))
        if "auth_token" in data.keys():
            admin_id = data["admin_id"]
            try:
                admin_record = admin.objects.get(id=admin_id)
                auth_token = uuid.UUID(data["auth_token"])
                if auth_token.hex == admin_record.auth_token.hex:
                    name = data["name"]
                    institute = admin_record.institute
                    teacher_record = teacher( name=name,
                                            institute=institute,
                                            admin=admin_record)
                    teacher_record.save()
                    return JsonResponse({"message":"Teacher registered"})
                else:
                    return JsonResponse({"message":"Wrong auth token"})
            except admin.DoesNotExist:
                return JsonResponse({"message":"Wrong admin id"})
    elif request.method == "GET":
        admin_id = request.GET.get("admin_id")
        try:
            data = teacher.objects.filter(admin=admin_id)
            serializer = teacher_serializer(data,many=True)
            return JsonResponse({"data":serializer.data},safe=False)        
        except teacher.DoesNotExist:
            return JsonResponse({"message":"Wrong admin id or course does not exist"})
    elif request.method == "DELETE":
        data = json.loads(request.body.decode("utf-8"))
        if "auth_token" in data.keys():
            admin_id = data["admin_id"]
            try:
                admin_record = admin.objects.get(id=admin_id)
                auth_token = uuid.UUID(data["auth_token"])
                if auth_token.hex == admin_record.auth_token.hex:
                    try:
                        teacher_record=teacher.objects.get(id=data["teacher_id"])
                        teacher_record.delete()
                        return JsonResponse({"message":"Teacher deleted"})
                    except teacher.DoesNotExist:
                        return JsonResponse({"message":"Teacher does not exist"})
                else:
                    return JsonResponse({"message":"Wrong auth token"})
            except admin.DoesNotExist:
                return JsonResponse({"message":"Wrong admin id"})

def subject_view_single(request):
    if request.method == "GET":
        admin_id = request.GET.get("admin_id")
        course_id = request.GET.get("course_id")
        try:
            data = subject.objects.filter(course=course_id,admin=admin_id)
            serializer = subject_serializer(data,many=True)
            return JsonResponse({"data":serializer.data},safe=False)        
        except course.DoesNotExist:
            return JsonResponse({"message":"Wrong admin id or Subject does not exist"})
    return JsonResponse({"message":"Only get Requests"})

@csrf_exempt
def subject_view(request):
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))
        if "auth_token" in data.keys():
            admin_id = data["admin_id"]
            try:
                admin_record = admin.objects.get(id=admin_id)
                auth_token = uuid.UUID(data["auth_token"])
                name = data["name"]
                course_record=course.objects.get(id=data["course"])
                teacher_record = teacher.objects.get(id=data["teacher"])
                institute = admin_record.institute    
                if auth_token.hex == admin_record.auth_token.hex:
                    print(data.keys())
                    subject_record = subject(name=name,
                                            course=course_record,
                                            teacher=teacher_record,
                                            institute=institute,
                                            admin=admin_record)
                    subject_record.save()
                    return JsonResponse({"message":"Subject registered"})
                else:
                    return JsonResponse({"message":"Wrong auth token"})
            except admin.DoesNotExist:
                return JsonResponse({"message":"Wrong admin id"})
    elif request.method == "GET":
        admin_id = request.GET.get("admin_id")
        course_id = request.GET.get("course_id")
        try:
            data = subject.objects.filter(admin=admin_id,course=course_id)
            serializer = subject_serializer(data,many=True)
            return JsonResponse({"data":serializer.data},safe=False)        
        except subject.DoesNotExist:
            return JsonResponse({"message":"Wrong admin id or course does not exist"})
    elif request.method == "DELETE":
        data = json.loads(request.body.decode("utf-8"))
        if "auth_token" in data.keys():
            admin_id = data["admin_id"]
            try:
                admin_record = admin.objects.get(id=admin_id)
                auth_token = uuid.UUID(data["auth_token"])
                if auth_token.hex == admin_record.auth_token.hex:
                    try:
                        subject_record=subject.objects.get(id=data["subject_id"])
                        subject_record.delete()
                        return JsonResponse({"message":"Subject deleted"})
                    except subject.DoesNotExist:
                        return JsonResponse({"message":"Subject does not exist"})
                else:
                    return JsonResponse({"message":"Wrong auth token"})
            except admin.DoesNotExist:
                return JsonResponse({"message":"Wrong admin id"})