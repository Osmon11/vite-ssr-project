FROM node:lts-alpine as build-stage
WORKDIR /app
COPY . .
RUN npm install -g npm
RUN npm install -g yarn --force
RUN yarn install
RUN yarn build

# этап production (production-stage)
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]