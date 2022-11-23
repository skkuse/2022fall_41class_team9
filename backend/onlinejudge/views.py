from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.generics import get_object_or_404

import sys
sys.path.append("..")
from db.models import Submission, Problem
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
        sid=request.GET['submit_id']
        uid=request.GET['user_id']
        pid=request.GET['prob_id']
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



################################################################################################
# 일단 모든 python 백엔드 여기에 넣음. 인풋아웃풋 이해하기 편하게. 나중에 떼어낼 것.

from src.codex.codex import get_explanation

class AnalysisAPIView(APIView):
    def get(self,request,pk):
        
        submission=get_object_or_404(Submission,submit_id=pk)
        submission_serializer = SubmissionSerializer(submission)
        problem = Problem.objects.filter(prob_id=submission_serializer.data['prob_id'])        
        problem=problem[0]
        
        
        #   get submission data
        submit_id = submission_serializer['submit_id']
        user_id = submission_serializer['user_id']
        prob_id = submission_serializer['prob_id']
        user_code = submission_serializer['user_code']
        user_output = submission_serializer['user_output']
        counter = submission_serializer['counter']
        
        #   get problem data
        answer_code = problem.answer_code
        deadline = problem.deadline
        constraint = problem.constraint
        
        #   pip install eval
        tc_open = eval(problem.tc_open)
        tc_open_input = tc_open['input']  # test case inputs. type: array , len N
        tc_open_output = tc_open['output'] # test case outputs. type:array , len N
        tc_close = eval(problem.tc_close)  
        tc_close_input = tc_close['input'] # hidden test case inputs. type: array, len M
        tc_close_output = tc_close['output'] # hidden test case inputs. type: array, len M
        
        
        # tc open 값 확인하고 싶다면,
        print(tc_open)
        print(type(tc_open))
        for i in tc_open_input:
            print(i)
            print(type(i))
        print(tc_open_input)
        print(type(tc_open_input))
        
        
        
        
        #   run python codes
        
        analysis= Analysis()
        
        #   change here #####################
        # analysis.efficiency = your_efficiency_function(needed arguments)
        # str bounderror 문제 발생시, str()로 감싸면 해결.
        
        analysis.submit_id=None # change later to analysis.submit_id = submit_id
        analysis.efficiency="test e" #text
        analysis.readability="test r" #text
        analysis.plagiarism=99 #float
        analysis.explanation=get_explanation(str(user_code)) #text
        analysis.functionability="test f" #text
        
        analysis_serializer=AnalysisSerializer(analysis)
        
        
        #   save to DB ( class Analysis(models.Model))
        # analysis_serializer.save()
        
        return Response(analysis_serializer.data,status=status.HTTP_200_OK)
    
################################################################################################