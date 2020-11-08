FROM node:12-alpine

WORKDIR /home/api

COPY package.json .
COPY package-lock.json .

RUN npm install


CMD npm run start:dev
