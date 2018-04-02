FROM node:carbon

WORKDIR /usr/src/brsos

COPY ./back/package*.json ./

RUN npm install --only=production

ENV PORT=27017
ENV DATABASE_HOST='mongo'
ENV DATABASE_USER='teste'
ENV DATABASE_PASS='testepass'
ENV DATABASE_NAME='teste'

COPY ./back .

EXPOSE 3000

CMD [ "npm", "start" ]