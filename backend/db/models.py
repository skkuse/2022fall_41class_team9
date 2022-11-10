from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.db.models.deletion import CASCADE
from django.db.models.enums import Choices

"""Todo
1. Pair programming for verification.
"""

class User(models.Model):
    THEME = [
        ('Dark', {'background': 'black', 'color': 'white'}),
        ('Light', {'background': 'white', 'color': 'black'}),
    ]
    FONT = [
        ('A', 'Arial'),
        ('C', 'Consolas'),
    ]

    user_id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    course = ArrayField(ArrayField(models.CharField(max_length=50)))
    setting_theme = models.CharField(choices=THEME, default='Light')
    setting_font = models.CharField(choices=FONT, default='C')

class Problem(models.Model):
    prob_id = models.IntegerField(primary_key=True)
    writer = models.CharField(max_length=50)
    title = models.CharField(max_length=50)
    tag = ArrayField(ArrayField(models.CharField(max_length=20)))
    description = models.TextField()
    constraint = models.TextField(blank=True)
    skeleton = models.TextField(blank=True)
    max_submission = models.IntegerField()
    deadline = models.DateField()

"""Todo
1. Result of checking (among Execute / Check / Submit)?
"""
class Submission(models.Model):
    submit_id = models.IntegerField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    prob_id = models.ForeignKey(Problem, on_delete=models.SET_NULL, null=True, blank=True)
    #answer?
    code = models.TextField(blank=True)
    output = models.TextField(blank=True)

#class sub-count is not implemented -- can be replaced by a query.

"""Todo
1. Subfields in efficiency field.
2. Subfileds in readability field.
3. The way to detect plagiarism.
"""
class Analysis(models.Model):
    submit_id = models.ForeignKey(Submission, on_delete=models.CASCADE)
    efficiency = models.IntegerField()
    readability = models.IntegerField()
    plagiarism = models.IntegerField()
    explanation = models.TextField(blank=True)

class Testcase(models.Model):
    tc_id = models.IntegerField(primary_key=True)
    prob_id = models.ForeignKey(Problem, on_delete=models.CASCADE)
    opened = models.BooleanField()
    stdin = models.TextField()
    expected_out = models.TextField()
