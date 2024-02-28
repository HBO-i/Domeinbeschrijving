# Runs while building the image.
FROM node:20-alpine as build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install
COPY . .
ARG REACT_APP_API_ENDPOINT
ARG REACT_APP_MAP_KEY

RUN npm run build



FROM nginx

COPY --from=build /app/build /usr/share/nginx/html

COPY deployment/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

