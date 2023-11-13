FROM node:16-alpine AS build
WORKDIR /app

COPY . .
RUN yarn install
RUN yarn build
# Serve Application using Nginx Server
FROM nginx:alpine
COPY --from=build /app/dist/ /usr/share/nginx/html
COPY --from=build /app/nginx/ /etc/nginx/conf.d/
