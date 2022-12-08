FROM node:lts-alpine as build-stage
WORKDIR /app
COPY . .
RUN yarn install
COPY libs/ckeditor5-build-classic/ node_modules/@ckeditor/ckeditor5-build-classic/
RUN yarn build
EXPOSE 3000
CMD ["yarn", "preview", "--host"]