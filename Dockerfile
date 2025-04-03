FROM node:22-alpine3.20 AS base
WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV CI="true"
RUN npm install -g corepack@latest
RUN corepack enable pnpm
COPY pnpm-lock.yaml package.json /app/

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm exec next telemetry disable
COPY . /app
RUN --mount=type=cache,target=/app/.next/cache pnpm build

FROM base AS runner
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
CMD node server.js






