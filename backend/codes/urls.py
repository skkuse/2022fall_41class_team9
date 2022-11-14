from django.urls import path,include
from .views import *

urlpatterns =[
    #path('todo/',TodosAPIView.as_view()),
    path('user/',UserAPIView.as_view()),
    path('course/',CourseAPIView.as_view()),
]