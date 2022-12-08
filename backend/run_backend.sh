python manage.py makemigrations
python manage.py migrate
mkdir -p /log # for `uwsgi` logging
uwsgi --ini uwsgi/uwsgi.ini
