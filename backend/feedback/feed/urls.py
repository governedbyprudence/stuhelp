from django.urls import path
from .views import feed_back_view

urlpatterns = [
    path("feedback",feed_back_view)
]
