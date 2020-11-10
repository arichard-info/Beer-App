FROM node:alpine

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm ci --no-optional

COPY ./ ./

EXPOSE 3000

CMD ["npm", "start"]