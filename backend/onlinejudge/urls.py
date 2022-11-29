from django.urls import path,include
from .views import *

urlpatterns =[
    path('validate/',validateTestcaseAPIView.as_view()),
    path('grade/',gradeCodeAPIView.as_view()),
    path('execute/',ExecuteAPIView.as_view()),
    path('analysis/<int:pk>',AnalysisAPIView.as_view()),
    path('analysis2/<int:pk>',AnalysisAPIView2.as_view()),
]