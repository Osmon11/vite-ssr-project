FROM node:lts-alpine as build-stage
WORKDIR /app
COPY . .
RUN yarn install
COPY libs/ckeditor5-build-classic/ node_modules/@ckeditor/ckeditor5-build-classic/
RUN yarn build


# этап production (production-stage)
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
CMD ["yarn", "preview", "--host"]