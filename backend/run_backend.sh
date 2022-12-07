python manage.py makemigrations
python manage.py migrate
python manage.py custommatch
mkdir -p /log # for `uwsgi` logging
uwsgi --ini uwsgi/uwsgi.ini