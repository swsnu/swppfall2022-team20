#frontend/Dockerfile
FROM snuspl/swpp:practice11

WORKDIR /usr/app

RUN apt-get update && apt-get install -y nginx

COPY package.json .
RUN yarn install --silent

COPY public/ public/
COPY tsconfig.json .
COPY src/ src/
RUN npm run build --prod --silent

COPY run_frontend.sh .

# should have made nginx configuration file to the frontend directory
COPY nginx.conf /etc/nginx/sites-available/nginx.conf
RUN rm /etc/nginx/sites-enabled/default
RUN ln -s /etc/nginx/sites-available/nginx.conf /etc/nginx/sites-enabled/nginx.conf
RUN mkdir -p /usr/share/nginx/html
RUN cp -r build/* /usr/share/nginx/html/

# SSL
RUN mkdir -p ssl

ENTRYPOINT sh ./run_frontend.sh
