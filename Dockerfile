FROM node:carbon

WORKDIR /usr/src/brsos

COPY ./back/package*.json ./

RUN npm install --only=production

ENV PORT=3000

ENV DB_PORT=27017
ENV HOST='mongo'
ENV DB_USER='teste'
ENV DB_PASS='testepass'
ENV DB_NAME='teste'

COPY ./back .

EXPOSE 3000

CMD [ "npm", "start" ]