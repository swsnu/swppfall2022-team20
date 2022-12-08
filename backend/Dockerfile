FROM snuspl/swpp:practice11
VOLUME /app
WORKDIR /app
COPY ./requirements.txt ./
RUN pip install -r ./requirements.txt
COPY . .
# Environment variables for django deployment
ENV DEBUG=False
ENV SECRET_KEY="default_secret_key_default_secret_key_default_secret_key_default_secret_key_default_secret_key_default_secret_key_default_secret_key_default_secret_key_"
ENV SECURE_HSTS_SECONDS=31536000
# ENV SECURE_SSL_REDIRECT=True
ENV SESSION_COOKIE_SECURE=True
ENV CSRF_COOKIE_SECURE=True
ENV SECURE_HSTS_INCLUDE_SUBDOMAINS=True
ENV SECURE_HSTS_PRELOAD=True
CMD sh ./run_backend.sh
