from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.generics import get_object_or_404
import json
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

def getCount(model):
    queryset=model.objects.all()
    return queryset.count()


class SubmissionsAPIView(APIView):


    def post(self, request):

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
        serializer=UserSerializer(data=request.data)
        serializer.data['user_id']=getCount(User)+1
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.error,status=status.HTTP_400_BAD_REQUEST)

class UserAPIView(APIView):
    def get(self,request):
        uname= request.GET['user_name']
        #user_name=User.objects.filter(username=uname)
        user=get_object_or_404(User,username=uname)
        serializer = UserSerializer(user)
        return Response(serializer.data,status=status.HTTP_200_OK)


class CoursesAPIView(APIView):
    # listserializer 접근법 :https://stackoverflow.com/questions/45532405/how-to-access-serializer-data-on-listserializer-parent-class-in-drf
    def get(self,request):
        courses=Course.objects.all()
        serializer = CourseSerializer(courses,many=True)
        print(serializer)
        return Response(serializer.data,status=status.HTTP_200_OK)
    def post(self, request):
        serializer = CourseSerializer(data=request.data)
        #serializer.data.
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.error,status=status.HTTP_400_BAD_REQUEST)

class CourseAPIView(APIView):
    def get(self,request,pk):
        course=get_object_or_404(Course,course_id=pk)
        serializer = CourseSerializer(course)
        return Response(serializer.data,status=status.HTTP_200_OK)

class UserCourseAPIView(APIView):
    # 특정 유저가 수강하는 과목에 대한 정보를 가져오는 ..
    def get(self,request):
        username=request.GET['user_name']
        if username:
            obj={}
            #filter는 list형으로 반환함.
            user=get_object_or_404(User,username=username)
            serializer=UserSerializer(user)
            courseid=serializer.data['courses'] # FK라서 한번 더 들어가야함.
            #print("ppp",courseid)

            #리스트가 아니면 리스트형태로 싸준다.
            if type(courseid) != list:
                courseid=[courseid]
            #course정보 불러오기
            for cid in courseid:
                _course=get_object_or_404(Course,course_id=cid)

                obj[_course.course_name]={
                    "course_id":cid,
                    "count":len(Problem.objects.filter(course_id=cid))
                }
            return Response(data=obj,status=status.HTTP_200_OK)
        return Response(status=404)


# class CodeAPIView(APIView):
#     def get(self, request):
#         code = Code

class ProblemsAPIView(APIView):
    def get(self,request):
        cid=request.GET['course_id']
        if cid=="":
            probs = Problem.objects.all()
            serializer = ProblemSerializer(probs,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        
        
        probs=Problem.objects.filter(course_id=cid)
        serializer=ProblemSerializer(probs,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    def post (self,request):
        serializer=ProblemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)

class ProblemAPIView(APIView):
    def get(self,request):
        problemid=request.GET['problem_id']
        prob=get_object_or_404(Problem,prob_id=problemid)
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
            uid=serializer.data['user_id']
            pid=serializer.data['prob_id']
            submissions  = Submission.objects.filter(user_id=uid,prob_id=pid)
            count=submission.count()

            serializer.data['counter']=count+1
            serializer.save()
            
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.error,status=status.HTTP_400_BAD_REQUEST)

class SubmissionAPIView(APIView):
    def get(self,request):
        sid=request.GET['submit_id']
        uid=request.GET['user_id']
        pid=request.GET['prob_id']
        
        #print("sid: ",sid,type(sid)," uid: ",uid," pid: ",pid)
        serializer = None
        if sid == "":
            submission= Submission.objects.filter(user_id=uid)
            serializer = SubmissionSerializer(submission,many=True)
        else:
            submission=get_object_or_404(Submission,prob_id=pid,user_id=uid)
            serializer = SubmissionSerializer(submission)
        #submission = get_object_or_404(Submission,submit_id=sid)
        

        return Response(serializer.data,status=status.HTTP_200_OK)
    def post(self,request):
        
        uid=request.data['user_id']
        pid=request.data['prob_id']
        submissions  = Submission.objects.filter(user_id=uid,prob_id=pid)
        count=submissions.count()
        request.data['counter']=count+1   
        serializer = SubmissionSerializer(data=request.data)
        #print(request.data['user_id']) 

        if serializer.is_valid():
            print("submitted")

            serializer.save()
            
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.error,status=status.HTTP_400_BAD_REQUEST)
            

#TEST    
class TestAPIView(APIView):
    def get(self,request):
        testCase=request.GET['testcase']
        print(testCase)
        json_str={
            "testcase":[([1,2,3],[0]),([1,2,3],[1])]
        }
        
        return Response(data=json_str,status=status.HTTP_200_OK)

class SubmissionCountAPIView(APIView):
    def get(self,request):
        user_id=request.GET['user_id']
        prob_id=request.GET['problem_id']
        subs=Submission.objects.filter(user_id=user_id,prob_id=prob_id)
        return Response(data={'trial':len(subs)},status=status.HTTP_200_OK)
class SkeletonCodeAPIView(APIView):
    def get(self,request):
        #해당 문제에 대한 스켈레톤 코드를 불러온다
        # (problem id )->( skeleton code)
        pid=request.GET['problem_id']
        problem=Problem.objects.filter(prob_id=pid)
        if len(problem)==0:
            return Response(status=404)
        print(problem)
        skeletonCode={
            "sceletonCode":problem[0].skeleton
        }
        print(skeletonCode)

        return Response(data=skeletonCode,status=status.HTTP_200_OK)

