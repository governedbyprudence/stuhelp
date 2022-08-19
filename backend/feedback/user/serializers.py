from dataclasses import field
from rest_framework import serializers 
from .models import institute, student,admin


class student_serializer(serializers.ModelSerializer):
    class Meta:
        model = student
        fields = ["id","institute","admin_id","first_name","last_name","email","course","auth_token"]

class admin_serializer(serializers.ModelSerializer):
    class Meta:
        model=admin
        fields=["id","institute_id","first_name","last_name","email","auth_token"]

class institute_serializer(serializers.ModelSerializer):
    class Meta:
        model=institute
        fields = "__all__"