from django.shortcuts import render

# Create your views here.
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

from src.codex import get_explanation
from src.memory_profile import get_memory_profile
from src import abstract
import re
class ExecuteAPIView(APIView):
    
    def post(self, request):
        x = request.data['user_code']
        
        print(x)
        execution_result = abstract.get_execution_result(x)
        print(execution_result[0])
        print(execution_result[1])
        er = execution_result[0]
        
        
        errorline = 0
        
        status = "success" if "Error" not in er else "fail"
        
        
        dict_result = {"status": status, "result": er}
        
        if "Error" in er:
            
            
            
            pattern = re.compile('(line\s*\d+)')
            pattern2 = pattern2 = re.compile('\d+')
            
            try:
                x = pattern.findall(er)
                y = pattern2.findall(x[0])
                errorline = y[0]
                
                dict_result["linePos"] = int(errorline)
            except:
                pass
                
     

        
        
        
        return Response(data=dict_result)

class validateTestcaseAPIView(APIView):

    def post(self, request):
        x = request.data['user_code']
        prob_id = request.data['prob_id']
        tc_num = request.data['tc_num']
        
        problem = Problem.objects.filter(prob_id=prob_id)
        problem=problem[0]
        
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
        
        
        current_testcase_input = tc_open_input[tc_num]
        current_testcase_output = tc_open_output[tc_num]
        
        print("current testcase input : ")
        print(current_testcase_input)
        print("current testcase output : ")
        print(current_testcase_output)
        
        print(x)
        execution_result = abstract.get_execution_result(x)
        print(execution_result[0])
        print(execution_result[1])
        y=abstract.get_grading_result(x, tc_open_input, tc_open_output, tc_close_input, tc_close_output)
        print(y)
        
        y = y.replace('true','True')
        y = y.replace('false','False')
        testcaseresult = eval(y)
        print(type(testcaseresult))
        
        print(testcaseresult[tc_num])
        
        if current_testcase_output == execution_result:
            print("true")
        else:
            print("false")
        dict_result = {"id" : tc_num , "status" : testcaseresult[tc_num]["status"] , "input" : testcaseresult[tc_num]["input"] , "output" : tc_open_output[tc_num], "userOutput" : testcaseresult[tc_num]["output"]}
        #dict_result = {"output": execution_result[0], "error": execution_result[1]}
        return Response(data=dict_result)


class gradeCodeAPIView(APIView):

    def post(self, request):
        x = request.data['user_code']
        prob_id = request.data['prob_id']
        tc_num = request.data['tc_num']
        
        problem = Problem.objects.filter(prob_id=prob_id)
        problem=problem[0]
        
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
        
        
        current_testcase_input = tc_open_input[tc_num]
        current_testcase_output = tc_open_output[tc_num]
        
        print("current testcase input : ")
        print(current_testcase_input)
        print("current testcase output : ")
        print(current_testcase_output)
        
        print(x)
        execution_result = abstract.get_execution_result(x)
        print(execution_result[0])
        print(execution_result[1])
        y=abstract.get_grading_result(x, tc_open_input, tc_open_output, tc_close_input, tc_close_output)
        print(y)
        
        y = y.replace('true','True')
        y = y.replace('false','False')
        testcaseresult = eval(y)
        print(type(testcaseresult))
        
        print(testcaseresult[tc_num])
        
        if current_testcase_output == execution_result:
            print("true")
        else:
            print("false")
        dict_result = {"id" : tc_num , "status" : testcaseresult[tc_num]["status"] , "input" : testcaseresult[tc_num]["input"] , "output" : tc_open_output[tc_num], "userOutput" : testcaseresult[tc_num]["output"]}
        #dict_result = {"output": execution_result[0], "error": execution_result[1]}
        return Response(data=dict_result)


class AnalysisAPIView(APIView):
    def get(self,request,pk):
        
        submission=get_object_or_404(Submission,submit_id=pk)
        submission_serializer = SubmissionSerializer(submission)
        problem = Problem.objects.filter(prob_id=submission_serializer.data['prob_id'])        
        
        past_submissions = Submission.objects.filter(prob_id=submission_serializer.data['prob_id'])
        problem=problem[0]
        
        #   get submission data
        submit_id = submission_serializer['submit_id'].value
        user_id = submission_serializer['user_id'].value
        prob_id = submission_serializer['prob_id'].value
        user_code = submission_serializer['user_code'].value
        user_output = submission_serializer['user_output'].value
        counter = submission_serializer['counter'].value
        
        """print(submit_id)
        print(user_id)
        print(prob_id)
        print(user_code)
        print(user_output)
        print(counter)"""
        
        
        # get past submissions from other users ( not yours) with the same problem, 
        
        """print("past_submissions!!")
        print(len(past_submissions))
        print("------")"""
        
        past_submissions_list = []
        for i in range(len(past_submissions)):
            # exlude if submitted by yourself..
            temp = past_submissions[i]
            
            temp_serializer = SubmissionSerializer(temp)
            print(temp_serializer['user_id'].value)
            temp_user_id = temp_serializer['user_id'].value
            if temp_user_id != user_id:
                past_submissions_list.append(past_submissions[i].user_code)
        
        print(past_submissions_list)
        print(len(past_submissions_list))
        print("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
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
        print(tc_open_input, tc_open_output, tc_close_input, tc_close_output)
        """print(tc_open)
        print(type(tc_open))
        for i in tc_open_input:
            print(i)
            print(type(i))
        print(tc_open_input)
        print(type(tc_open_input))"""
        
        
        
        
        #   run python codes
        
        analysis= Analysis()
        
        #   change here #####################
        # analysis.efficiency = your_efficiency_function(needed arguments)
        # str bounderror 문제 발생시, str()로 감싸면 해결.
        
        analysis.submit_id=None # change later to analysis.submit_id = submit_id
        analysis.efficiency=abstract.get_efficiency_analysis(user_code,tc_open_input) #text
        print("@@@")
        
        #print(abstract.get_efficiency_analysis(user_code, tc_open_input, encoding="cp949")) #text
        analysis.readability=abstract.get_readability_analysis(user_code) #text
        analysis.plagiarism=abstract.get_plagiarism_score(user_code, [user_code]) #float
        analysis.explanation=get_explanation(str(user_code)) #text
        analysis.functionability=abstract.get_grading_result(user_code, tc_open_input, tc_open_output, tc_close_input, tc_close_output) #text
        
        #   memory profile
        # memory profile 결과 array받기
        # memory profile 용 db key 가 따로 없기 때문에 analysis 결과 json 에 memory profile 값 이어붙여서 제공해야 할듯.
        memory_profile_array = get_memory_profile(str(user_code),tc_open_input[0])
        
        maximum_memory_usage = max(memory_profile_array)
        average_memory_usage = sum(memory_profile_array)/len(memory_profile_array)
        print("MB used per sec: " + str(memory_profile_array))
        print("maximum memory usage: " + str(maximum_memory_usage) + "MB")
        print("average memory usage: " + str(average_memory_usage) + "MB")
        
        
        
        
        
        analysis_serializer=AnalysisSerializer(analysis)
        
        
        #   save to DB ( class Analysis(models.Model))
        # analysis_serializer.save()
        
        return Response(analysis_serializer.data,status=status.HTTP_200_OK)




################################################################################################