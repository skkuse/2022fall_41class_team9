from django.urls import path,include
from .views import *

urlpatterns =[
    #path('todo/',TodosAPIView.as_view()),
    path('users/',UsersAPIView.as_view()),
    path('user/<int:pk>',UserAPIView.as_view()),
    path('courses/',CoursesAPIView.as_view()),
    path('course/<int:pk>',CourseAPIView.as_view()),
    path('problems/',ProblemsAPIView.as_view()),
    path('problem/<int:pk>',ProblemAPIView.as_view()),
    path('submission/',SubmissionAPIView.as_view()),
    path('submissions/',SubmissionsAPIView.as_view()),
    #path()
]