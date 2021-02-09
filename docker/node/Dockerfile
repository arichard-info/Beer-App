FROM node:alpine

WORKDIR /usr/app/server/
COPY ./server/package*.json ./
RUN npm ci
COPY ./server/ ./

EXPOSE 5000

CMD ["npm", "run" ,"start"]