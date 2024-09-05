FROM node:22-alpine3.19 AS deps
WORKDIR /app
RUN corepack enable
COPY package.json yarn.lock ./
COPY .yarnrc.yml ./.yarnrc.yml
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn install


FROM node:22-alpine3.19 AS ci
WORKDIR /app
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn ci:lint

FROM node:22-alpine3.19 AS builder
WORKDIR /app
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM node:22-alpine3.19 as runner
WORKDIR /app
RUN corepack enable
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
CMD node server.js






