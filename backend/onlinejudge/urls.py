from django.urls import path,include
from .views import *

urlpatterns =[
    #path('todo/',TodosAPIView.as_view()),

    path('analysis/<int:pk>',AnalysisAPIView.as_view()),
    #path()
]