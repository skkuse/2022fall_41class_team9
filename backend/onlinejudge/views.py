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
        if execution_result[1] > -1:
            dict_result['linePos'] = execution_result[1]
        """
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
                
     

        
        
        """
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
        print("###################$$$$$$$$$$$$$$$$#################")
        print(execution_result[0])
        print(execution_result[1])
        print("###################$$$$$$$$$$$$$$$$#################")
        y=abstract.get_grading_result(x, tc_open_input, tc_open_output, tc_close_input, tc_close_output)
        print(y)
        
        #y = y.replace('true','True')
        #y = y.replace('false','False')
        #testcaseresult = eval(y)
        testcaseresult = y
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
        
        
        print(x)
        execution_result = abstract.get_execution_result(x)
        print(execution_result[0])
        print(execution_result[1])
        y=abstract.get_grading_result(x, tc_open_input, tc_open_output, tc_close_input, tc_close_output)
        print(y)
        
        #y = y.replace('true','True')
        #y = y.replace('false','False')
        #testcaseresult = eval(y)
        testcaseresult = y
        print(type(testcaseresult))
        list_result = []
        for i in testcaseresult:
            
            
            if i["is_open"]:
                dict_result = {"id" : i["id"] , "status" : i["status"] , "input" : i["input"] , "output" : i["answer"], "userOutput" : i["output"]}
            else:
                dict_result = {"id" : i["id"] , "status" : i["status"] , "input" : "hidden" , "output" : "hidden", "userOutput" : "hidden"}
            list_result.append(dict_result)
        
        return Response(data=list_result)


class AnalysisAPIView2(APIView):
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
        
        #########################################
        #   save to DB ( class Analysis(models.Model))
        # analysis_serializer.save()
        
        ##############################
        ## parse....
        ##############################
        submitresult = {}
        result_testcase = []
        print("========@@@@@@@@@@@@@@@@@@@@@@@@@@@@================")
        print(analysis.functionability)
        print("========@@@@@@@@@@@@@@@@@@@@@@@@@@@@================")
        #testcaseresult = analysis.functionability.replace('true','True')
        #testcaseresult = testcaseresult.replace('false','False')
        #testcaseresult = eval(testcaseresult)
        testcaseresult = analysis.functionability
        for i in testcaseresult:
            dict_i = {"id" : i["id"] , "status" : i["status"] , "input" : i["input"] , "output" : i["answer"], "userOutput" : i["output"]}
            result_testcase.append(dict_i)
            
        result_efficiency = []
        efficiencyresult = analysis.efficiency
        #efficiencyresult = eval(analysis.efficiency)    
        #print(efficiencyresult)
        
        for i in efficiencyresult:
            efficiencytype = {}
            id = i
            
            if i == "LOC":
                loc_score = efficiencyresult[i]
                list_of_more_info = []
                if loc_score < 10:
                    score = 100
                elif loc_score < 20:
                    score = 80
                elif loc_score < 40:
                    score = 60
                elif loc_score < 80:
                    score = 40
                elif loc_score < 160:
                    score = 20
                    
            elif i == "halstead":
                list_of_more_info = []
                moreinfo = efficiencyresult[i]
                
                halstead_sum = 0
                for j in moreinfo:
                    label = j
                    result = moreinfo[j]
                    moreinfodict = {}
                    moreinfodict["label"] = label
                    moreinfodict["result"] = result
                    halstead_sum+=result
                    list_of_more_info.append(moreinfodict)
                
                # give scores....
                if halstead_sum < 2500:
                    score = 100
                elif halstead_sum < 2600:
                    score = 80
                elif halstead_sum < 2800:
                    score = 60
                elif halstead_sum < 2900:
                    score = 40
                elif halstead_sum < 3000:
                    score = 20
            elif i == "CFC":
                cfc_score = efficiencyresult[i]
                list_of_more_info = []
                if cfc_score < 10:
                    score = 100
                elif cfc_score < 20:
                    score = 80
                elif cfc_score < 40:
                    score = 60
                elif cfc_score < 80:
                    score = 40
                elif cfc_score < 160:
                    score = 20
                    
            elif i == "DFC":
                dfc_score = efficiencyresult[i]
                list_of_more_info = []
                if dfc_score < 10:
                    score = 100
                elif dfc_score < 20:
                    score = 80
                elif dfc_score < 40:
                    score = 60
                elif dfc_score < 80:
                    score = 40
                elif dfc_score < 160:
                    score = 20
                    
            
            efficiencytype["id"] = id
            efficiencytype["score"] = score
            efficiencytype["moreInfo"] = list_of_more_info
            
            result_efficiency.append(efficiencytype)


        result_readability = []
        
        #readabilityresult = eval(analysis.readability)    
        readabilityresult = analysis.readability
        print(readabilityresult)
        
        for i in readabilityresult:
            readabilitytype = {}
            id = i
            print(id)
            print(readabilityresult[id])
            print("length")
            print(len(readabilityresult[id]))
            list_of_more_info = []
            if len(readabilityresult[id]) == 0:
                score = 100
            else:
                for j in readabilityresult[id]:
                    
                    moreinfo = j
                
                    moreinfodict = {}
                    moreinfodict["label"] = moreinfo
                    moreinfodict["result"] = moreinfo               
                    list_of_more_info.append(moreinfodict)
                score = 0
            
            readabilitytype["id"] = id
            readabilitytype["score"] = score
            readabilitytype["moreInfo"] = list_of_more_info
            
            result_readability.append(readabilitytype)
        result_explanation = analysis.explanation
        result_codeDiff = []
        result_plagiarism = analysis.plagiarism
        
        submitresult["functionality"] = result_testcase
        submitresult["efficiency"]  = result_efficiency
        submitresult["readabilityType"] =  result_readability
        submitresult["codeExplanation"] =  result_explanation
        submitresult["codeDiff"] =  result_codeDiff
        submitresult["plagiarism"] =  result_plagiarism
        
        return Response(data=submitresult,status=status.HTTP_200_OK)

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