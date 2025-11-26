# API de Notificações

API RESTful para gerenciamento de notificações com autenticação JWT, paginação e soft delete.

## Sobre

API para gerenciar notificações de usuários com operações de criar, listar, marcar como lida e cancelar.

**Stack:**
- Node.js + TypeScript + Express
- MongoDB + Mongoose
- JWT para autenticação
- Zod para validação
- Jest para testes
- Docker Compose

## Instalação

### Com Docker (recomendado)

```bash
git clone https://github.com/LeoChagas09/desafio-confi-fullstack.git
cd desafio-confi-fullstack/backend
docker compose up -d
```

A API estará em `http://localhost:3000` e a documentação em `http://localhost:3000/api-docs`.

### Sem Docker

```bash
git clone https://github.com/LeoChagas09/desafio-confi-fullstack.git
cd desafio-confi-fullstack/backend
npm install

# Configure .env com sua string do MongoDB
# MONGO_URI=mongodb://localhost:27017/notificacoes

npm run dev
```

## Uso

### 1. Autenticação

Gere um token JWT:

```bash
curl -X POST http://localhost:3000/api/notifications/login \
  -H "Content-Type: application/json" \
  -d '{"userId": "user_123"}'
```

Resposta:
```json
{"token": "eyJhbGc..."}
```

### 2. Criar notificação

```bash
curl -X POST http://localhost:3000/api/notifications \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "userId": "user_123",
    "content": "Nova mensagem",
    "category": "social"
  }'
```

### 3. Listar notificações

```bash
curl "http://localhost:3000/api/notifications/from/user_123?page=1&limit=10" \
  -H "Authorization: Bearer SEU_TOKEN"
```

### 4. Marcar como lida

```bash
curl -X PATCH http://localhost:3000/api/notifications/NOTIFICATION_ID/read \
  -H "Authorization: Bearer SEU_TOKEN"
```

### 5. Cancelar notificação

```bash
curl -X DELETE http://localhost:3000/api/notifications/NOTIFICATION_ID \
  -H "Authorization: Bearer SEU_TOKEN"
```

## Testes

```bash
npm test              # Rodar testes
npm test -- --coverage  # Com cobertura
```

Testes estão em `src/services/NotificationService.test.ts` e cobrem a lógica de negócios.

## Arquitetura

### Camadas

```
Controllers → Services → Repositories → Models
```

- **Controllers**: Recebem requests HTTP
- **Services**: Lógica de negócio
- **Repositories**: Acesso aos dados
- **Models**: Schemas do Mongoose

### Decisões técnicas

**Validação com Zod**: Type-safe e integrado ao TypeScript.

**Soft Delete**: Campo `canceledAt` + middleware do Mongoose filtra automaticamente registros cancelados.

**IDs flexíveis**: Regex `/^[a-zA-Z0-9_-]+$/` permite diversos formatos (shortId, nanoid, ULID) mantendo segurança.

**JWT mock**: Endpoint `/login` simples para testes. Em produção seria Auth0/Firebase ou sistema próprio.

**Paginação**: Evita sobrecarga com `?page=1&limit=10`.

## Próximos passos

- Testes E2E com supertest
- CI/CD com GitHub Actions
- Rate limiting
- Logging estruturado (Winston)
- WebSockets para tempo real

## Documentação

Swagger interativo: `http://localhost:3000/api-docs`

## Estrutura

```
src/
├── app.ts
├── server.ts
├── config/
│   ├── database.ts
│   └── swagger.ts
├── controllers/
├── interfaces/
├── middlewares/
├── models/
├── repositories/
├── routes/
└── services/
```
