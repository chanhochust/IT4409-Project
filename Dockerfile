FROM node:22-alpine3.19 AS build
WORKDIR /app

COPY package.json yarn.lock ./
RUN corepack enable
COPY .yarn ./.yarn
COPY .yarnrc.yml package.json yarn.lock ./
RUN yarn install --immutable
COPY . .
RUN yarn build


FROM nginx:alpine
WORKDIR /app
COPY --from=build /app/out /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]





