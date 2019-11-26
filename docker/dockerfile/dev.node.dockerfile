FROM node:12.10.0

WORKDIR /usr/app

COPY ./package*.json ./

RUN npm ci -qy

COPY ./ ./

EXPOSE 5000

CMD ["npm", "dev"]