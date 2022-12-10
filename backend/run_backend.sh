python manage.py makemigrations
python manage.py migrate
mkdir -p /log # for `uwsgi` logging
bash
# uwsgi --ini uwsgi/uwsgi.ini
