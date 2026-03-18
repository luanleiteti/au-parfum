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
RUN cd apps/server && bun run build

FROM base AS prod-deps
RUN cat <<'EOF' > package.json
{
  "dependencies": {
    "elysia": "^1.4.21",
    "@elysiajs/cors": "^1.4.1",
    "better-auth": "1.5.2",
    "drizzle-orm": "^0.45.1",
    "pg": "^8.17.1",
    "dotenv": "^17.2.2",
    "@t3-oss/env-core": "^0.13.1",
    "zod": "^4.1.13"
  }
}
EOF
RUN bun install --production

FROM base
ENV NODE_ENV=production
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/apps/server/dist ./dist

EXPOSE 3000
USER bun
CMD ["bun", "run", "dist/index.mjs"]
