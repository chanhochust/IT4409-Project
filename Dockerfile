FROM node:22-alpine3.19 AS deps
WORKDIR /app
RUN corepack enable
COPY package.json yarn.lock ./
COPY .yarnrc.yml ./.yarnrc.yml
RUN yarn install

FROM node:22-alpine3.19 AS builder
WORKDIR /app
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM node:22-alpine3.19
WORKDIR /app
RUN corepack enable
COPY --from=builder /app/ ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/.yarnrc.yml ./yarnrc.yml
COPY --from=builder /app/node_modules ./node_modules
CMD yarn start

#FROM node:22-alpine3.19 AS serve
#WORKDIR /app
#COPY --from=builder /app/out /app/out
#EXPOSE 80
#CMD npx serve -s /app/out

#FROM nginx:alpine
#COPY --from=builder /app/out /usr/share/nginx/html
#COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]






