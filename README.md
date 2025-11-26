# Sistema de Notificações

Sistema fullstack completo para gerenciamento de notificações de usuários. Backend em Node.js + TypeScript e frontend em React, ambos com autenticação JWT.

## Sobre o Projeto

Aplicação para criar, listar, marcar como lida e remover notificações. A API segue uma arquitetura em camadas com separação de responsabilidades, validação robusta e soft delete. O frontend oferece uma interface intuitiva com filtros, paginação e animações.

### Stack Principal

**Backend:**
- Node.js + TypeScript + Express
- MongoDB com Mongoose
- JWT para autenticação
- Zod para validação de schemas
- Jest para testes unitários
- Swagger/OpenAPI para documentação
- Docker Compose para infraestrutura

**Frontend:**
- React 19 + TypeScript
- Vite como bundler
- Tailwind CSS v4
- Axios com interceptors
- Framer Motion para animações
- date-fns para formatação de datas
- react-hot-toast para notificações

## Quick Start

### 1. Clonar o repositório

```bash
git clone https://github.com/LeoChagas09/desafio-confi-fullstack.git
cd desafio-confi-fullstack
```

### 2. Subir o Backend

```bash
cd backend

# Subir o MongoDB via Docker
docker compose up -d

# Instalar dependências
npm install

# Rodar em modo de desenvolvimento
npm run dev
```

A API estará rodando em `http://localhost:3000`

Documentação Swagger: `http://localhost:3000/api-docs`

### 3. Subir o Frontend

Em outro terminal:

```bash
cd frontend

# Instalar dependências
npm install

# Configurar variáveis de ambiente (já está criado por padrão)
# Altere .env se precisar apontar para outro backend

# Rodar em desenvolvimento
npm run dev
```

A aplicação estará em `http://localhost:5173`

> **Nota:** O arquivo `.env` já vem configurado. Só precisa alterar se for usar um backend diferente de `localhost:3000`.

## Testando a Aplicação

### 1. Acessar o Frontend

Abra `http://localhost:5173` no navegador.

### 2. Fazer Login

Use qualquer identificador de usuário, por exemplo: `usuario_teste`

O sistema gerará um token JWT automaticamente.

### 3. Criar Notificações

Você pode criar notificações pela interface ou via API diretamente:

**Via Swagger:**
- Acesse `http://localhost:3000/api-docs`
- Clique em `/login` e use `usuario_teste`
- Copie o token gerado
- Clique em "Authorize" e cole o token
- Use o endpoint POST `/notifications` para criar notificações

**Via cURL:**

```bash
# 1. Obter token
curl -X POST http://localhost:3000/api/notifications/login \
  -H "Content-Type: application/json" \
  -d '{"userId": "usuario_teste"}'

# 2. Criar notificação (substitua SEU_TOKEN pelo token obtido)
curl -X POST http://localhost:3000/api/notifications \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "userId": "usuario_teste",
    "content": "Sua primeira notificação!",
    "category": "info"
  }'
```

### 4. Interagir na Interface

- **Marcar como lida:** Clique no ícone de check
- **Remover:** Clique no ícone de lixeira
- **Filtrar:** Use os filtros por texto, categoria ou status
- **Paginar:** Navegue entre as páginas se houver muitas notificações

## Estrutura do Projeto

```
.
├── backend/                 # API RESTful
│   ├── src/
│   │   ├── controllers/     # Recebe requests HTTP
│   │   ├── services/        # Lógica de negócio
│   │   ├── repositories/    # Acesso aos dados
│   │   ├── models/          # Schemas Mongoose
│   │   ├── middlewares/     # Auth e validação
│   │   ├── routes/          # Definição de rotas
│   │   ├── config/          # Database e Swagger
│   │   └── interfaces/      # TypeScript DTOs
│   ├── docker-compose.yml   # Orquestração MongoDB
│   ├── jest.config.ts       # Configuração de testes
│   └── README.md
│
└── frontend/                # Aplicação React
    ├── src/
    │   ├── components/      # Componentes modulares
    │   ├── api.ts           # Cliente HTTP + interceptors
    │   ├── types.ts         # Interfaces TypeScript
    │   └── App.tsx          # Orquestração principal
    └── README.md
```

## Funcionalidades Implementadas

### Requisitos Obrigatórios ✅

**Backend:**
- [x] Criar notificação
- [x] Listar notificações paginadas por usuário
- [x] Marcar notificação como lida
- [x] Remover notificação (soft delete)
- [x] Persistência em MongoDB
- [x] Arquitetura em camadas (Controllers → Services → Repositories → Models)
- [x] Validação de payloads com Zod
- [x] Tratamento de erros com códigos HTTP apropriados
- [x] Testes unitários (criação e marcação como lida)
- [x] Docker Compose
- [x] Variáveis de ambiente (.env)
- [x] README completo com instruções

**Frontend:**
- [x] Listar notificações paginadas
- [x] Marcar como lida
- [x] Remover notificação
- [x] Interface intuitiva
- [x] Consumo da API REST
- [x] Status visual (lida/não lida)
- [x] Estrutura organizada
- [x] README com instruções

### Diferenciais Implementados ✅

- [x] **Autenticação JWT** - Todas as rotas protegidas
- [x] **Documentação Swagger/OpenAPI** - Interface interativa em `/api-docs`
- [x] **Filtros avançados** - Busca por texto, categoria e status
- [x] **Animações** - Framer Motion para transições suaves
- [x] **Toast notifications** - Feedback visual das ações
- [x] **Modal de confirmação** - UX melhorada para exclusões
- [x] **TypeScript** - Type safety em todo o projeto

### Não Implementados (Ver NOTES.md para detalhes)

- [ ] Meteor.js (não adequado para arquitetura REST + React separados)
- [ ] Redis para cache de contagem
- [ ] Testes E2E/integração
- [ ] WebSockets para tempo real
- [ ] CI/CD

## Testes

### Backend

```bash
cd backend

# Rodar todos os testes
npm test

# Com cobertura
npm test -- --coverage
```

Os testes cobrem:
- Criação de notificação
- Marcação como lida
- Cancelamento (soft delete)
- Validação de erros

### Frontend

Frontend não possui testes automatizados no momento (ver `frontend/NOTES.md` para próximos passos).

## Decisões Técnicas

### Backend

**Clean Architecture:** Separação em camadas facilita manutenção e testes. Controllers não conhecem detalhes do banco, Services não conhecem HTTP.

**Soft Delete:** Campo `canceledAt` ao invés de remover fisicamente. Middleware do Mongoose filtra automaticamente registros cancelados em queries.

**Validação com Zod:** Type-safe e integrado ao TypeScript. Erros de validação retornam JSON estruturado.

**IDs Flexíveis:** Validação regex `[a-zA-Z0-9_-]+` permite integração com sistemas legados e uso de bibliotecas modernas (nanoid, ULID, shortId).

**JWT Mock:** Endpoint `/login` simples para testes. Em produção seria substituído por Auth0, Firebase ou sistema próprio com hash de senha.

### Frontend

**Vite:** HMR muito mais rápido que Create React App. Build otimizado para produção.

**Tailwind CSS:** Prototipagem rápida sem sair do JSX. Configuração v4 usa CSS @import.

**Componentização:** App.tsx dividido em 8 componentes modulares para melhor manutenibilidade.

**localStorage para JWT:** Simples e funcional para MVP. Vulnerável a XSS, ideal seria HttpOnly cookies.

**useState local:** Suficiente para o escopo atual. Se crescer, migrar para Context API ou Zustand.

## Build de Produção

### Backend

```bash
cd backend

# Compilar TypeScript
npm run build

# Rodar versão compilada
npm start
```

### Frontend

```bash
cd frontend

# Build otimizado
npm run build

# Testar o build localmente
npm run preview
```

Os arquivos estarão em `frontend/dist/` prontos para deploy em qualquer servidor estático (Netlify, Vercel, etc).

## Deploy

### Backend

Pode ser deployado em:
- **Heroku/Railway:** Suporte nativo a Node.js
- **AWS ECS/EKS:** Docker Compose pode ser convertido
- **DigitalOcean App Platform:** Deploy direto do GitHub

Variáveis de ambiente necessárias:
```env
MONGO_URI=mongodb://...
JWT_SECRET=sua_secret_key
PORT=3000
```

### Frontend

Pode ser deployado em:
- **Vercel/Netlify:** Deploy automático do GitHub
- **AWS S3 + CloudFront:** Arquivos estáticos
- **GitHub Pages:** Para projetos públicos

Configurar variável:
```env
VITE_API_URL=https://sua-api.com/api
```

## Documentação Adicional

- **Backend:** Ver `backend/README.md` para detalhes da API e exemplos de uso
- **Frontend:** Ver `frontend/README.md` para decisões de UI/UX
- **Trade-offs:** Ver arquivos `NOTES.md` em cada pasta para decisões técnicas detalhadas

## Contato

Leonardo Chagas - [GitHub](https://github.com/LeoChagas09)

Projeto: [https://github.com/LeoChagas09/desafio-confi-fullstack](https://github.com/LeoChagas09/desafio-confi-fullstack)