FROM node:14.15.0-alpine

#Dependencies
RUN apk add --virtual .build-deps python make g++ gcc git autoconf automake libtool file nasm pkgconf build-base

RUN npm install -g gatsby-cli

WORKDIR /usr/src/app

COPY / /usr/src/app/

RUN npm install

CMD [ "npm", "start" ]
