FROM oven/bun:1.3.10-slim AS base
WORKDIR /app

FROM base AS install
COPY package.json bun.lock ./
COPY apps/server/package.json ./apps/server/
COPY apps/web/package.json ./apps/web/
COPY packages/auth/package.json ./packages/auth/
COPY packages/db/package.json ./packages/db/
COPY packages/env/package.json ./packages/env/
COPY packages/config/package.json ./packages/config/
RUN bun install --frozen-lockfile

FROM install AS build
COPY . .
ARG NUXT_PUBLIC_SERVER_URL=http://localhost:3000
ENV NUXT_PUBLIC_SERVER_URL=${NUXT_PUBLIC_SERVER_URL}
RUN cd apps/web && bun run build

FROM base
ENV NODE_ENV=production
COPY --from=build /app/apps/web/.output ./.output

EXPOSE 3000
USER bun
CMD ["bun", ".output/server/index.mjs"]
