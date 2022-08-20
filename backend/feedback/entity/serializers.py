from rest_framework import serializers
from .models import course, subject, teacher

class course_serializer(serializers.ModelSerializer):

    class Meta:
        model = course
        fields= "__all__"

class teacher_serializer(serializers.ModelSerializer):

    class Meta:
        model = teacher
        fields = "__all__"

class subject_serializer(serializers.ModelSerializer):

    class Meta:
        model = subject
        fields = "__all__"