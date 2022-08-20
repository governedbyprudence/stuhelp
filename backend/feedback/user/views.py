from django.shortcuts import render

# Create your views here.
import uuid
from entity.models import course
from .serializers import institute_serializer, student_serializer,admin_serializer
from rest_framework import status
import json
from django.http import JsonResponse
from .models import student,admin,institute
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def student_view(request):
    '''
    This view is used for registering logging in and deleing student records
    '''
    if request.method=="GET":
        try:
            email=request.GET.get("email")
            password=request.GET.get("password")
            try:
                dataset=student.objects.get(email=email,password=password)
                print(dataset)
                institute_record=institute.objects.get(id=dataset.institute.id)
                inst_data=institute_serializer(institute_record)    
                dataset.auth_token=uuid.uuid4()
                dataset.save()
                serializer=student_serializer(dataset)
                data={"data":serializer.data,"institute":inst_data.data,"message":"Student logged in"}
                return JsonResponse(data)
            except student.DoesNotExist:
                return JsonResponse({"message":"username or password incorrect"},status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return JsonResponse({"message":"Something wrong with data"},status=status.HTTP_400_BAD_REQUEST)            
    elif request.method == "POST":
        data=json.loads(request.body.decode("utf-8"))
        if "admin_id" in data.keys() and "auth_token" in data.keys():       
            try:
                admin_id=data["admin_id"]
                admin_data=admin.objects.get(id=admin_id)
                institute_id=admin_data.institute
                first_name=data["first_name"]
                last_name=data["last_name"]
                course=data["course"]
                email=data["email"]
                auth_token=uuid.UUID(data["auth_token"])
                password="abcd1234" 
                if auth_token.hex == admin_data.auth_token.hex:
                    dataset=student(institute=institute_id,admin_id=admin_data,first_name=first_name,last_name=last_name,course=course,email=email,password=password)
                    dataset.save()
                    return JsonResponse({"message":"Successfully registered"},status=status.HTTP_200_OK)
                else:
                    return JsonResponse({"message":"Corrupt Auth token"})
            except Exception as e :
                print(e)
                return JsonResponse({"message":"Something wrong with data"},status=status.HTTP_400_BAD_REQUEST)
        else:
            return JsonResponse({"message":"Admin login first"},status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        data = json.loads(request.body.decode("utf-8"))
        if "auth_token" in data.keys():
            admin_id = data["admin_id"]
            try:
                admin_record = admin.objects.get(id=admin_id)
                auth_token = uuid.UUID(data["auth_token"])
                if auth_token.hex == admin_record.auth_token.hex:
                    try:
                        student_record=student.objects.get(id=data["student_id"])
                        student_record.delete()
                        return JsonResponse({"message":"Student deleted"})
                    except student.DoesNotExist:
                        return JsonResponse({"message":"Student does not exist"})
                else:
                    return JsonResponse({"message":"Wrong auth token"})
            except admin.DoesNotExist:
                return JsonResponse({"message":"Wrong admin id"})

def get_students(request):
    '''
    This view is used to get the students collection based on course and admin id.
    Used by admin to get student records
    '''
    if request.method == "GET":
        course_id = request.GET.get("course_id")
        admin_id = request.GET.get("admin_id")
        try:
            dataset=student.objects.filter(admin_id=admin_id,course=course_id)
            serializer = student_serializer(dataset,many=True)
            return JsonResponse({"data":serializer.data,"message":"Fetch successful"})
        except student.DoesNotExist:
            return JsonResponse({"message":"wrong id"})
    return JsonResponse({"message":""}) 

@csrf_exempt
def admin_view(request):
    '''
    This view is used to create and log in admins 
    '''
    if request.method=="GET":
        try:
            email=request.GET.get("email")
            password=request.GET.get("password")
            try:
                dataset=admin.objects.get(email=email,password=password)
                dataset.auth_token = uuid.uuid4()
                dataset.save()
                serializer=admin_serializer(dataset)
                data={"data":serializer.data,"message":"Admin logged in"}
                return JsonResponse(data,safe=False)
            except admin.DoesNotExist:
                return JsonResponse({"message":"username or password incorrect"},status=status.HTTP_400_BAD_REQUEST)
        except Exception as  e:
            print(e)
            return JsonResponse({"message":"Something wrong with request"},status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "POST":
        data=json.loads(request.body.decode("utf-8"))
        try:
            institute_id=data["institute_id"]
            first_name=data["first_name"]
            last_name=data["last_name"]
            email=data["email"]
            password=data["password"]
            try:
                institute_ob=institute.objects.get(id=institute_id)
                try:
                    dataset=admin(institute=institute_ob,
                    first_name=first_name,last_name=last_name,email=email,password=password,auth_token=None)
                    print(dataset.first_name)
                    dataset.save()
                except Exception as e:
                    print("admin exception",e)
                    return JsonResponse({"message":"admin not save error"})
                institute_ob.admin_id=dataset.id
                institute_ob.save()
            except Exception as e:
                print(e)
                return JsonResponse({"message":"Wrong institute id"})
            return JsonResponse({"message":"Admin successfully registered"})
        except Exception as e:
            print(e)
            return JsonResponse({"message":"Something wrong with request"},status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def logout(request):
    '''
    This view is used for logging out students and admins
    '''
    if request.method == "POST":
        data=json.loads(request.body.decode("utf-8"))
        if "auth_token" in data.keys() and "admin_id" in data.keys():
            admin_record = admin.objects.get(id=data["admin_id"])
            auth_token=""
            try:
                auth_token = uuid.UUID(data["auth_token"])
            except Exception:
                return JsonResponse({"message":"Wrong auth token"})
            if admin_record.auth_token.hex == auth_token.hex:
                admin_record.auth_token = None
                admin_record.save()
                return JsonResponse({"message":"Successfully logged out"})
            else:
                return JsonResponse({"message":"Wrong auth token"})
                
        if "auth_token" in data.keys() and "student_id" in data.keys():
            print("Student")
            student_record = student.objects.get(id=data["student_id"])
            auth_token=""
            try:
                auth_token=uuid.UUID(data["auth_token"])
            except Exception:
                return JsonResponse({"message":"Wrong auth token"})
            if student_record.auth_token.hex == auth_token.hex:
                student_record.auth_token = None
                student_record.save()
                return JsonResponse({"message":"Successfully logged out"})
            else:
                return JsonResponse({"message":"Wrong auth token"})

