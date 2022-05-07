FROM node:18.1.0

ENV LANG=ja_JP.UTF-8 \
    TZ=Asia/Tokyo \
    USER=root \
    APP_HOME=/usr/src/app

WORKDIR $APP_HOME
