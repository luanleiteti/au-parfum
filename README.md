# Au Parfum

Monorepo full-stack com **Nuxt 4** no frontend e **ElysiaJS** no backend, usando **Bun** como runtime e package manager, **PostgreSQL** como banco de dados e **Better Auth** para autenticação.

## Stack

| Camada | Tecnologia |
|--------|------------|
| Runtime | Bun 1.3.10 |
| Frontend | Nuxt 4, Vue 3, Nuxt UI 4, Tailwind CSS 4 |
| Backend | ElysiaJS |
| Banco de dados | PostgreSQL 17, Drizzle ORM |
| Autenticação | Better Auth (email/password) |
| Monorepo | Turborepo |
| Lint/Fmt | oxlint, oxfmt |

## Estrutura

```
au-parfum/
├── apps/
│   ├── server/             # API backend (ElysiaJS)
│   └── web/                # Frontend (Nuxt 4)
├── packages/
│   ├── auth/               # Configuracao Better Auth (server + client)
│   ├── config/             # tsconfig base compartilhada
│   ├── db/                 # Drizzle ORM, schema e migrations
│   └── env/                # Validacao de variaveis de ambiente
├── docker-compose.yml      # Docker Compose para desenvolvimento
├── docker-compose.prod.yml # Docker Compose para producao
├── turbo.json
└── package.json
```

## Dependencias entre packages

```
@au-parfum/env
    │
    ├──────────────────┬──────────────────┐
    ▼                  ▼                  ▼
@au-parfum/db    @au-parfum/auth        web
(drizzle, pg)    (better-auth)       (nuxt, auth)
    │                  │
    └────────┬─────────┘
             ▼
           server
       (elysia, cors)
```

- **server** depende de `@au-parfum/auth`, `@au-parfum/db`, `@au-parfum/env`
- **web** depende de `@au-parfum/auth`, `@au-parfum/env`
- **@au-parfum/auth** depende de `@au-parfum/db`, `@au-parfum/env`
- **@au-parfum/db** depende de `@au-parfum/env`
- **@au-parfum/env** sem dependencias internas

## Primeiros passos

### Pre-requisitos

- [Bun](https://bun.sh/) >= 1.3.10
- [Docker](https://www.docker.com/) (para PostgreSQL)

### 1. Instalar dependencias

```bash
bun install
```

### 2. Configurar variaveis de ambiente

Crie os arquivos `.env` baseados no exemplo:

**apps/server/.env**

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/au-parfum
BETTER_AUTH_SECRET=<string-aleatoria-com-pelo-menos-32-caracteres>
BETTER_AUTH_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3001
```

**apps/web/.env**

```env
NUXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### 3. Subir o banco de dados

```bash
bun db:start
```

### 4. Aplicar o schema no banco

```bash
bun db:push
```

### 5. Rodar em modo desenvolvimento

```bash
bun dev
```

Os servicos ficam disponiveis em:

| Servico | URL |
|---------|-----|
| API (server) | http://localhost:3000 |
| Web (nuxt) | http://localhost:3001 |
| PostgreSQL | localhost:5432 |

Para rodar apenas um dos apps:

```bash
bun dev:server    # apenas a API
bun dev:web       # apenas o frontend
```

## Docker

### Desenvolvimento

O `docker-compose.yml` na raiz sobe todos os servicos com hot-reload:

```bash
bun docker:dev
```

Servicos:

| Container | Descricao |
|-----------|-----------|
| `au-parfum-postgres` | PostgreSQL 17 Alpine com healthcheck |
| `au-parfum-deps` | Servico init que roda `bun install` uma vez |
| `au-parfum-server` | Elysia com `bun run --hot` (hot-reload) |
| `au-parfum-web` | Nuxt dev com `--host 0.0.0.0` |

Tambem e possivel subir apenas o Postgres:

```bash
docker compose up postgres
```

### Producao

O `docker-compose.prod.yml` builda imagens otimizadas multi-stage:

```bash
# Copiar e editar variaveis de ambiente
cp .env.production.example .env.production

# Buildar e subir
docker compose -f docker-compose.prod.yml --env-file .env.production up -d --build
```

As variaveis obrigatorias estao em `.env.production.example`:

| Variavel | Descricao |
|----------|-----------|
| `POSTGRES_PASSWORD` | Senha do PostgreSQL |
| `BETTER_AUTH_SECRET` | Secret do auth (min 32 chars) |
| `BETTER_AUTH_URL` | URL publica da API |
| `CORS_ORIGIN` | Origem permitida pelo CORS |
| `NUXT_PUBLIC_SERVER_URL` | URL da API acessivel pelo browser |
| `SERVER_PORT` | Porta do server (default: 3000) |
| `WEB_PORT` | Porta do web (default: 3001) |

Para parar:

```bash
bun docker:down:prod
```

## Banco de dados

O schema e gerenciado pelo Drizzle ORM em `packages/db/src/schema/`.

| Comando | Descricao |
|---------|-----------|
| `bun db:start` | Sobe o container PostgreSQL |
| `bun db:stop` | Para o container |
| `bun db:down` | Remove o container e rede |
| `bun db:push` | Aplica o schema diretamente no banco |
| `bun db:generate` | Gera arquivos de migration |
| `bun db:migrate` | Executa migrations pendentes |
| `bun db:studio` | Abre o Drizzle Studio (GUI) |

### Schema

As tabelas de autenticacao estao em `packages/db/src/schema/auth.ts`:

- **user** — id, name, email, emailVerified, image, createdAt, updatedAt
- **session** — id, expiresAt, token, userId, ipAddress, userAgent
- **account** — id, accountId, providerId, userId, accessToken, refreshToken
- **verification** — id, identifier, value, expiresAt

## Autenticacao

O Better Auth esta configurado em `packages/auth/src/index.ts` com:

- Adapter Drizzle (PostgreSQL)
- Metodo email/password habilitado
- Cookies com `sameSite: "none"`, `secure: true`, `httpOnly: true`

No backend, as rotas `/api/auth/*` sao encaminhadas ao handler do Better Auth.

No frontend, o plugin `app/plugins/auth-client.ts` cria o client Better Auth para Vue, acessivel via `useAuthClient()`.

## Variaveis de ambiente

A validacao e feita pelo `@t3-oss/env` em `packages/env/`:

### Server (`packages/env/src/server.ts`)

| Variavel | Tipo | Default |
|----------|------|---------|
| `DATABASE_URL` | string | — |
| `BETTER_AUTH_SECRET` | string (min 32) | — |
| `BETTER_AUTH_URL` | URL | — |
| `CORS_ORIGIN` | URL | — |
| `NODE_ENV` | `development` \| `production` \| `test` | `development` |

### Web (`packages/env/src/web.ts`)

| Variavel | Tipo | Default |
|----------|------|---------|
| `NUXT_PUBLIC_SERVER_URL` | URL | — |

## Scripts

| Script | Descricao |
|--------|-----------|
| `bun dev` | Roda todos os apps em dev |
| `bun build` | Builda todos os apps |
| `bun check-types` | Verificacao de tipos |
| `bun check` | Lint (oxlint) + formatacao (oxfmt) |
| `bun dev:server` | Dev apenas do server |
| `bun dev:web` | Dev apenas do web |
| `bun docker:dev` | Dev completo via Docker |
| `bun docker:prod` | Producao via Docker |
| `bun docker:down` | Para containers dev |
| `bun docker:down:prod` | Para containers prod |
