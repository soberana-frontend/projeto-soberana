# Soberana Segurança e Vigilância

Site institucional da **Soberana Segurança e Vigilância**, empresa de segurança patrimonial atuante no Distrito Federal. O projeto é um monorepo com frontend em Next.js e backend em NestJS + Prisma.

## Stack

| Camada   | Tecnologia                        |
|----------|-----------------------------------|
| Frontend | Next.js 16, React 19, TypeScript  |
| Backend  | NestJS, Prisma ORM, PostgreSQL    |
| Estilo   | CSS puro (globals.css), sem Tailwind |
| Deploy   | Vercel (frontend)                 |

> **Nota:** O projeto **não usa Tailwind CSS**. Todo o estilo é definido via CSS custom properties e regras CSS tradicionais em `frontend/src/app/globals.css`.

## Como rodar localmente

### Pré-requisitos

- Node.js ≥ 20
- PostgreSQL (para o backend)
- npm ou pnpm

### Frontend

```bash
cd frontend
npm install
npm run dev
# Acesse http://localhost:3000
```

### Backend

```bash
cd backend
npm install
npx prisma migrate dev      # cria/migra o banco
npm run start:dev           # modo desenvolvimento
# API em http://localhost:3001
```

### Variáveis de ambiente

Copie os arquivos `.env.example` para `.env` em ambas as pastas (`frontend/` e `backend/`) e preencha com os valores reais:

```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

## Estrutura de pastas

```
projeto_soberana/
├── frontend/               # Next.js App Router
│   └── src/
│       ├── app/            # Rotas e páginas (layout.tsx, page.tsx, /orcamento, /admin)
│       ├── assets/         # Logos e imagens estáticas importadas
│       ├── components/ui/  # Componentes reutilizáveis (Header, Footer, Logo, WhatsAppButton, CtaBanner)
│       ├── features/       # Módulos por seção (hero, credentials, services, segments, team, news, social, budget)
│       └── lib/            # Utilitários e cliente da API
├── backend/                # NestJS REST API
│   └── src/
│       ├── auth/           # Autenticação JWT
│       ├── budget/         # Módulo de orçamentos
│       ├── news/           # CRUD de notícias
│       ├── segments/       # Segmentos de atuação
│       ├── services/       # Serviços oferecidos
│       └── prisma/         # Schema e migrations do Prisma
└── docs/                   # Documentação histórica e diagramas
```

## Sistema de design / tokens

Todas as variáveis de design estão definidas em [`frontend/src/app/globals.css`](frontend/src/app/globals.css).

### Cores imutáveis (header, hero, footer — não mudam entre temas)

| Variável  | Valor     | Uso                          |
|-----------|-----------|------------------------------|
| `--bg`    | `#1a2345` | Azul-marinho (fundo escuro)  |
| `--surf`  | `#243060` | Superfície escura            |
| `--brand` | `#2b3a91` | Azul institucional           |
| `--gold`  | `#FFD215` | Dourado (CTAs, destaques)    |
| `--sky`   | `#0094d9` | Azul vivo                    |
| `--acc`   | `#5cc8ff` | Acento claro                 |

### Cores que alternam entre temas

| Variável        | Light       | Dark        | Uso                      |
|-----------------|-------------|-------------|--------------------------|
| `--main-bg`     | `#F4F6FA`   | `#0f1628`   | Fundo principal do main  |
| `--card-bg`     | `#ffffff`   | `#1a2345`   | Fundo dos cards          |
| `--heading`     | `#1a2345`   | `#eef1fa`   | Títulos                  |
| `--body`        | `#4a5578`   | `#b8c3e5`   | Texto corrido            |
| `--link`        | `#2b3a91`   | `#5cc8ff`   | Links                    |
| `--line-light`  | `#d0d8e8`   | `#2d3a60`   | Bordas e divisores       |

### Espaçamento e layout

| Variável    | Base   | @640px | @1024px | Uso                     |
|-------------|--------|--------|---------|-------------------------|
| `--header-h`| 72px   | 96px   | 120px   | Altura do header sticky |

### Tipografia

- Fonte: **Roboto** (via `next/font/google`)
- Tamanhos fluidos com `clamp()` — ex: `h1 { font-size: clamp(2rem, 5vw, 4rem) }`
- Nav menu: `clamp(0.875rem, 0.8rem + 0.25vw, 1.0625rem)`

## Tema claro/escuro

A alternância de tema funciona via atributo `data-theme` no elemento `<html>`:

- **Inicialização**: script inline em [`frontend/src/app/layout.tsx`](frontend/src/app/layout.tsx) lê `localStorage('soberana-theme')` ou `prefers-color-scheme` antes da renderização para evitar flash.
- **Toggle**: botão no Header ([`frontend/src/components/ui/Header.tsx`](frontend/src/components/ui/Header.tsx)) alterna entre `'light'` e `'dark'`, atualizando o atributo `data-theme` e salvando no localStorage.
- **CSS**: as variáveis são redefinidas em `:root[data-theme="dark"]` no globals.css. Transições suaves respeitam `prefers-reduced-motion`.

## Segurança

### Autenticação do painel admin (cookies HTTP-only)

A autenticação do `/admin` utiliza cookies **HTTP-only** com criptografia TLS de ponta a ponta em produção:

- **Cookie seguro**: o token JWT é definido pelo backend via `Set-Cookie` com flags `HttpOnly`, `Secure` (produção), `SameSite: lax`, `path: /` e `maxAge: 24h`. O JavaScript do navegador **não consegue ler** o token, protegendo contra XSS.
- **Middleware server-side**: [`frontend/src/middleware.ts`](frontend/src/middleware.ts) protege todas as rotas `/admin/*` no Edge Runtime, redirecionando para `/admin/login` antes de renderizar qualquer HTML caso o cookie esteja ausente.
- **Estratégia JWT híbrida**: [`backend/src/auth/strategies/jwt.strategy.ts`](backend/src/auth/strategies/jwt.strategy.ts) extrai o token prioritariamente de `req.cookies.token`, com fallback para header `Authorization: Bearer` (compatibilidade com Swagger/integrações externas).
- **Logout dedicado**: rota `POST /auth/logout` limpa o cookie via `res.clearCookie()`.
- **CORS configurado**: `credentials: true` com origin explícita (sem wildcard `*`).
- **Sem credenciais no código**: senha do admin definida exclusivamente via variável de ambiente `ADMIN_PASSWORD`; chave JWT via `JWT_SECRET` (ambas obrigatórias, sem fallback hardcoded).

> ⚠️ **Para produção com domínios distintos** (frontend Vercel ≠ backend): altere `sameSite: 'lax'` para `sameSite: 'none'` em [`backend/src/auth/auth.controller.ts`](backend/src/auth/auth.controller.ts) e garanta que `secure: true` esteja sempre ativo.

### Variáveis de ambiente obrigatórias (backend)

| Variável | Descrição | Obrigatória |
|----------|-----------|-------------|
| `JWT_SECRET` | Chave secreta para assinar tokens JWT | Sim |
| `ADMIN_EMAIL` | E-mail do usuário admin criado no seed | Não (padrão: `admin@soberana.com`) |
| `ADMIN_PASSWORD` | Senha forte do usuário admin | **Sim** (seed falha se não definida) |
| `DATABASE_URL` | Conexão PostgreSQL | Sim |
| `FRONTEND_URL` | Origin permitida no CORS | Sim |

## Responsividade e UX

### Auditoria de consistência (Header/Footer)

Todas as 6 páginas públicas (`/`, `/institucional`, `/premios`, `/parceiros`, `/trabalhe-conosco`, `/orcamento`) compartilham o **mesmo** Header e Footer via [`frontend/src/app/(public)/layout.tsx`](frontend/src/app/(public)/layout.tsx). Nenhum CSS condicional por página ou tema altera altura/espaçamento. O grupo `/admin` tem layout próprio independente.

| Breakpoint | Header (`--header-h`) | Footer padding-top |
|------------|----------------------|--------------------|
| Mobile (<640px) | 72px | 3rem (48px) |
| Tablet (≥640px) | 96px | 3rem (48px) |
| Desktop (≥1024px) | 120px | 4.25rem (68px) |

### Correções de responsividade aplicadas

| Componente | Problema | Correção |
|------------|----------|----------|
| Upload de currículo ([`JobForm.tsx`](frontend/src/app/(public)/trabalhe-conosco/JobForm.tsx)) | Input file nativo estourava layout em 320-375px; feedback de arquivo longo sem word-break | Label customizado com `opacity:0; position:absolute; inset:0` (iOS Safari compatível); `overflow-wrap: break-word` no feedback e erros |
| Carrossel de serviços ([`ServicesCarousel.tsx`](frontend/src/features/services/components/ServicesCarousel.tsx)) | Drag horizontal capturava scroll vertical da página | `touchmove` com `{ passive: false }` + `preventDefault()` condicional quando `|dx| > |dy|` |
| Hero institucional ([`globals.css`](frontend/src/app/globals.css)) | Vão excessivo (~400px) entre header e título; placeholder de foto invisível | Padding ajustado para `calc(var(--header-h) + 1.5rem)`; span `.inst-img-placeholder` com texto visível sobre gradiente |
| Página /institucional | Cor de fundo do hero igual ao resto da página | Background alterado para `#2a4a8a` (azul mais claro) diferenciando a seção |

## Bugs conhecidos e corrigidos

| Bug | Causa | Correção |
|-----|-------|----------|
| Header com alturas diferentes entre temas claro/escuro | `--header-h` estava dentro de `:root, :root[data-theme="light"]` (especificidade 0,1,1), impedindo override por `@media :root` (0,1,0) | Movido `--header-h` para bloco `:root` isolado |
| Logo parecia menor no tema claro | Contraste visual menor sobre fundo claro | Adicionado override `:root[data-theme="light"] .logo-img` com valores maiores de `clamp()` |
| Tamanho abrupto do nav menu entre breakpoints | Font-size fixo por breakpoint causava saltos visuais | Substituído por `clamp()` fluido |
| Logo inconsistente entre header e footer | Mesma classe `.logo-img` sem contexto específico | Adicionada regra `footer .logo-img` com sizing próprio |
| Dropdown "Institucional" exigia clique no desktop | `<details>` nativo só abre com click/tap | Adicionados handlers `onMouseEnter`/`onMouseLeave` no Header.tsx para abrir no hover (≥768px) |
| Build falhava na Vercel (TS2552) | Variável `lastY` usada mas nunca declarada no ServicesCarousel | Adicionada declaração `let lastY = 0` |

## Pendências (placeholders a preencher)

Os seguintes itens contêm dados fictícios ou placeholders que precisam ser substituídos por informações reais da empresa:

| Arquivo | Placeholder | Descrição |
|---------|-------------|-----------|
| [`frontend/src/components/ui/Footer.tsx:102`](frontend/src/components/ui/Footer.tsx) | `[inserir]` | Nome do desenvolvedor/agência nos créditos do footer |
| [`frontend/src/components/ui/WhatsAppButton.tsx:3`](frontend/src/components/ui/WhatsAppButton.tsx) | `55SEUNUMERO` | Número real do WhatsApp da empresa |
| [`frontend/src/components/ui/CtaBanner.tsx:9`](frontend/src/components/ui/CtaBanner.tsx) | `55SEUNUMERO` | Número real do WhatsApp (banner CTA) |
| [`frontend/src/features/hero/components/Hero.tsx:14`](frontend/src/features/hero/components/Hero.tsx) | `55SEUNUMERO` | Número real do WhatsApp (hero) |
| [`frontend/src/features/hero/components/Stats.tsx:7-8`](frontend/src/features/hero/components/Stats.tsx) | `+30 anos`, `+2.000` | Números reais de anos de atuação e postos de trabalho |
| [`frontend/src/features/budget/components/BudgetForm.tsx:117`](frontend/src/features/budget/components/BudgetForm.tsx) | `(61) 99999-9999` | Telefone de exemplo no formulário de orçamento |

## Deploy

O frontend é publicado automaticamente na **Vercel** a cada push na branch `main`.

### Fluxo após alterações

```bash
git add <arquivos-alterados>
git commit -m "descrição da mudança"
git push origin main
# Vercel detecta o push e inicia o deploy automaticamente
```

> ⚠️ **Nunca faça commit de arquivos `.env`** — eles contêm credenciais e já estão no `.gitignore`. Use `.env.example` como template.

### Variáveis de ambiente na Vercel

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `NEXT_PUBLIC_GA_ID` | ID de medição do Google Analytics 4 | `G-XXXXXXXXXX` |

Adicione essa variável em **Settings > Environment Variables** no painel da Vercel. O componente `<GoogleAnalytics>` só é renderizado quando a variável está definida, evitando erros em ambientes sem configuração.

## Histórico de commits com referências removidas

Os seguintes commits no histórico do git mencionam a instituição de origem da paleta. O histórico não foi reescrito, mas as referências foram removidas do código e documentação atuais:

- `ac6ecb7` — style: header transparente com backdrop-blur estilo Católica
- `5a4e201` — style: use lighter UCB blue #27348B for main background
- `1c61fef` — style: update main background to UCB-inspired #202057