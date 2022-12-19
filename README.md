# 2022fall_41class_team9
![image](https://user-images.githubusercontent.com/82107503/207755558-5599e9de-51a0-45c1-8f17-931e43d557f3.png)

## Contact
- 강민구 netisen4@gmail.com
- 구자현 rnwkgus0212@gmail.com 
- 김수겸 metishonora@icloud.com
- 연민석 eric9907@naver.com
- 위성은 sachoi1201@naver.com
- 이원규 stbaker517@g.skku.edu

## Project Topology
Project: codingplatform
- APP1: codes
- APP2: onlinejudges
- APP3: problems
- APP4: analysis


## Project Environment
every materials are based on the "BOOK, Chapter 6"
PLZ Watch the BOOK!

- django: 3.1.6
- django_rest_framework: 3.12.2

## Install Python Library
In root directory
- pip3 install -r requirements.txt

When error occurs..
- pip3 install --upgrade pip

## How to run locally
1. (optional: if migration does not work properly) rm (app_name)/migrations/*.py (except \_\_init\_\_.py!!)
2. rm db.sqlite3
3. python -m venv your_own_venv
4. source your_own_venv/bin/activate
5. python pip install django==3.1.6 django_rest_framework==3.12.2
6. python manage.py makemigrations
7. python manage.py migrate
8. python manage.py createsuperuser
9. python manage.py runserver
10. Goto https://localhost:8000/admin page.

## Usage
### SELECT with Serializers
```
from db.models import *
from db.serializers import *
user = UserSerializer(User.objects.get(pk=1))  # SELECT FROM User WHERE primary_key('user_id') = 1
user.data
```
You can get JSON data.

### SELECT *
```
Course.objects.all()
```

### INSERT INTO db
```
Course.objects.create(course_id='1', course_name='a_brand_new_course')
```

### DELETE FROM db
```
Course.objects.get(pk=1).delete()
```
