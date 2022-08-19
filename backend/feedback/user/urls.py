from django.urls import path
from .views import get_students, student_view,admin_view,logout

urlpatterns = [
    path('student',student_view),
    path('adm',admin_view),
    path('getstudent',get_students),
    path("logout",logout),
]
