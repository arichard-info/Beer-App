FROM node:alpine as builder

ARG CONTEXT=run

WORKDIR /usr/src/app
COPY ./client/package*.json ./
RUN npm ci
COPY ./client/ .
RUN CONTEXT=$CONTEXT npm run build

# ------------------------------------------------------
# Production Build
# ------------------------------------------------------
FROM nginx:1.16.0-alpine

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./docker/nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]