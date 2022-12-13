from rest_framework import serializers

from db.models import Course
from db.models import User
from db.models import Problem
from db.models import Submission
from db.models import Analysis
from db.models import Recommand

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class ProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = "__all__"


class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = "__all__"


class AnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Analysis
        fields = "__all__"

class RecommandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recommand
        fields = "__all__"