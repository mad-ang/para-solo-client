# syntax=docker/dockerfile:1

FROM nginx
WORKDIR /usr/share/react

RUN curl -fsSL https://deb.nodesource.com/setup_19.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g yarn
COPY ["package.json", "package-lock.json","tscconfig.*","yarn.lock", "./"]
ENV NODE_ENV=production
RUN yarn
COPY . .
RUN yarn run build

RUN rm -r /usr/share/nginx/html/*

RUN cp -a dist/. /usr/share/nginx/html

EXPOSE 5173
