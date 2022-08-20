from django.urls import path 
from .views import course_view, course_view_single, subject_view, subject_view_single, teacher_view

urlpatterns = [
    path("course",course_view),
    path("getcourse",course_view_single),
    path("getsubject",subject_view_single),
    path("faculty",teacher_view),
    path("subject",subject_view),
]
