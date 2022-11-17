from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.generics import get_object_or_404

import sys
sys.path.append("..")
from db.models import Submission
from db.serializers import *
# Create your views here.
# class Submission(models.Model):
#     submit_id = models.IntegerField(primary_key=True)
#     user_id = models.ForeignKey('User', on_delete=models.CASCADE)
#     prob_id = models.ForeignKey('Problem', on_delete=models.CASCADE)
#     user_code = models.TextField()
#     user_output = models.TextField()
#     counter = models.IntegerField()

class SubmissionsAPIView(APIView):


    def post(self, request, submit_id,user_id,prob_id,user_code,user_output,counter):
        serializer = SubmissionSerializer(data=request.data)



class SubmissionsByUserIdAPIView(APIView):
    def get(self,request,user_id):
        submissions = Submission.objects.filter(user_id=user_id)
        

class UsersAPIView(APIView):
    def get(self,request):
        users=User.objects.all()
        serializer = UserSerializer(users,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    def post (self,request):
        serializer=ProblemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.error,status=status.HTTP_400_BAD_REQUEST)

class UserAPIView(APIView):
    def get(self,request,pk):
        user=get_object_or_404(User,user_id=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data,status=status.HTTP_200_OK)


class CoursesAPIView(APIView):
    def get(self,request):
        courses=Course.objects.all()
        serializer = CourseSerializer(courses,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    def post(self, request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.error,status=status.HTTP_400_BAD_REQUEST)

class CourseAPIView(APIView):
    def get(self,request,pk):
        course=get_object_or_404(Course,course_id=pk)
        serializer = CourseSerializer(course)
        return Response(serializer.data,status=status.HTTP_200_OK)

        
# class CodeAPIView(APIView):
#     def get(self, request):
#         code = Code

class ProblemsAPIView(APIView):
    def get(self,request):
        probs = Problem.objects.all()
        serializer = ProblemSerializer(probs,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    def post (self,request):
        serializer=ProblemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)

class ProblemAPIView(APIView):
    def get(self,request,pk):
        prob=get_object_or_404(Problem,prob_id=pk)
        serializer = ProblemSerializer(prob)
        return Response(serializer.data,status=status.HTTP_200_OK)

class SubmissionsAPIView(APIView):
    def get(self,request):
        submissions = Submission.objects.all()
        serializer = SubmissionSerializer(submissions,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    def post(self,request):
        serializer = SubmissionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.error,status=status.HTTP_400_BAD_REQUEST)

class SubmissionAPIView(APIView):
    def get(self,request):
        # sid=request.GET['submit_id']
        # uid=request.GET['user_id']
        # pid=request.GET['prob_id']
        # print("sid: ",sid,type(sid)," uid: ",uid," pid: ",pid)
        serializer = None
        if sid == "":
            submission= Submission.objects.filter(user_id=uid)
            serializer = SubmissionSerializer(submission,many=True)
        else:
            submission=get_object_or_404(Submission,submit_id=sid)
            serializer = SubmissionSerializer(submission)
        #submission = get_object_or_404(Submission,submit_id=sid)
        
        return Response(serializer.data,status=status.HTTP_200_OK)

        