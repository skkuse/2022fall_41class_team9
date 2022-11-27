from django.contrib import admin
from .models import Course, User, Problem, Submission, Analysis

# Register your models here.
admin.site.register(Course)
admin.site.register(User)
admin.site.register(Problem)
admin.site.register(Submission)
admin.site.register(Analysis)