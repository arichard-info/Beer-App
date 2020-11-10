FROM node:alpine

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm ci --no-optional

COPY ./ ./

EXPOSE 5000

CMD ["npm", "run", "dev"]