from django.db import models
from django.db.models.deletion import CASCADE
from django.db.models.enums import Choices


class Course(models.Model):
    course_id = models.IntegerField(primary_key=True)
    course_name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.course_name


class User(models.Model):
    THEME = [
        ("Dark", "{'background': 'black', 'color': 'white'}"),
        ("Light", "{'background': 'white', 'color': 'black'}"),
    ]
    FONT = [
        ("A", "Arial"),
        ("C", "Consolas"),
    ]

    user_id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=50)
    courses = models.ManyToManyField('Course')
    setting_theme = models.CharField(choices=THEME, default="Light", max_length=50)
    setting_font = models.CharField(choices=FONT, default="C", max_length=50)

    def __str__(self):
        return self.username


class Problem(models.Model):
    prob_id = models.IntegerField(primary_key=True)
    course_id = models.ForeignKey('Course', on_delete=models.CASCADE)
    writer = models.CharField(max_length=50)
    title = models.CharField(max_length=50, unique=True)
    tag = models.TextField()
    description = models.TextField()
    constraint = models.TextField()
    answer_code = models.TextField()
    skeleton = models.TextField()
    max_submission = models.IntegerField()
    deadline = models.DateField()
    tc_open = models.TextField()
    tc_close = models.TextField()

    def __str__(self):
        return self.title


class Submission(models.Model):
    submit_id = models.IntegerField(primary_key=True)
    user_id = models.ForeignKey('User', on_delete=models.CASCADE)
    prob_id = models.ForeignKey('Problem', on_delete=models.CASCADE)
    user_code = models.TextField()
    user_output = models.TextField()
    counter = models.IntegerField()

    def __str__(self):
        return "{}: {} #{}".format(self.user_id, self.prob_id, self.counter)


class Analysis(models.Model):
    submit_id = models.ForeignKey('Submission', on_delete=models.CASCADE)
    efficiency = models.TextField(blank=True)
    readability = models.TextField(blank=True)
    plagiarism = models.FloatField()
    explanation = models.TextField(blank=True)
    functionability = models.TextField(blank=True)

    def __str__(self):
        return "{}".format(self.submit_id)

