from django.urls import path,include
from .views import *

urlpatterns =[
    path('execute/',ExecuteAPIView.as_view()),
    path('analysis/<int:pk>',AnalysisAPIView.as_view()),
]