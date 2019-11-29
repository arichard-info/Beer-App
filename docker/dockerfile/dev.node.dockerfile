FROM node:12.10.0

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm ci -qy

COPY ./ ./

EXPOSE 5000

CMD ["npm", "run", "dev"]