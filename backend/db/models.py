from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.db.models.deletion import CASCADE
from django.db.models.enums import Choices


class Course(models.Model):
    course_id = models.IntegerField(primary_key=True)
    course_name = models.CharField(max_length=50)


class User(models.Model):
    THEME = [
        ("Dark", {"background": "black", "color": "white"}),
        ("Light", {"background": "white", "color": "black"}),
    ]
    FONT = [
        ("A", "Arial"),
        ("C", "Consolas"),
    ]

    user_id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    course_id = models.ForeignKey(
        Course, on_delete=models.SET_NULL, null=True, blank=True
    )
    setting_theme = models.CharField(choices=THEME, default="Light", max_length=50)
    setting_font = models.CharField(choices=FONT, default="C", max_length=50)


class Problem(models.Model):
    prob_id = models.IntegerField(primary_key=True)
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE)
    writer = models.CharField(max_length=50)
    title = models.CharField(max_length=50)
    tag = ArrayField(ArrayField(models.CharField(max_length=20)))
    description = models.TextField()
    constraint = models.TextField(blank=True)
    answer_code = models.TextField()
    skeleton = models.TextField(blank=True)
    max_submission = models.IntegerField()
    deadline = models.DateField()
    tc_open = models.TextField()
    tc_close = models.TextField()


class Submission(models.Model):
    submit_id = models.IntegerField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    prob_id = models.ForeignKey(Problem, on_delete=models.CASCADE)
    user_code = models.TextField(blank=True)
    user_output = models.TextField(blank=True)
    counter = models.IntegerField()


class Analysis(models.Model):
    submit_id = models.ForeignKey(Submission, on_delete=models.CASCADE)
    efficiency = models.TextField(blank=True)
    readability = models.TextField(blank=True)
    plagiarism = models.FloatField()
    explanation = models.TextField(blank=True)
    functionability = models.TextField(blank=True)
