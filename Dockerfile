FROM node:22-alpine3.19 AS deps
WORKDIR /app
RUN corepack enable

COPY package.json yarn.lock ./
COPY .yarnrc.yml ./.yarnrc.yml
COPY .yarn ./.yarn
RUN yarn install

FROM node:22-alpine3.19 AS builder
WORKDIR /app
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn run build

FROM node:22-alpine3.19 AS serve
WORKDIR /app
COPY --from=builder /app/out /app/out
EXPOSE 80
CMD npx serve -s /app/out





