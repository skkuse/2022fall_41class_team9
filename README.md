# 2022fall_41class_team9

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

## How to run locally
1. (optional: if migration does not work properly) rm (app_name)/migrations/*.py (except __init__.py!!)
2. rm db.sqlite3
3. python -m venv your_own_venv
4. source your_own_venv/bin/activate
5. python pip install django==3.1.6 django_rest_framework==3.12.2
6. python manage.py makemigrations
7. python manage.py migrate
8. python manage.py createsuperuser
9. python manage.py runserver
10. Goto https://localhost:8000/admin page.
