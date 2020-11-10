# Setup and build the client

FROM node:alpine as client

WORKDIR /usr/app/client/
COPY ./client/package*.json ./
RUN npm ci --no-optional
COPY ./client/ ./
RUN npm run build


# Setup the server

FROM node:alpine

WORKDIR /usr/app/
COPY --from=client /usr/app/client/dist/ ./client/dist/

WORKDIR /usr/app/server/
COPY ./server/package*.json ./
RUN npm ci --no-optional
COPY ./server/ ./

EXPOSE 5000

CMD ["npm", "run" ,"start"]