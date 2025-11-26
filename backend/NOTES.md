# Notas Técnicas

Decisões tomadas durante o desenvolvimento e trade-offs assumidos.

## Diferenciais implementados

Além dos requisitos mínimos:

1. **Documentação Swagger/OpenAPI**
   - Rota `/api-docs` com interface interativa
   - Facilita teste e consumo da API

2. **Autenticação JWT**
   - Todas as rotas protegidas
   - Endpoint mock `/login` para gerar tokens de teste

## Arquitetura

### Clean Architecture simplificada

Separação em camadas (Controllers → Services → Repositories → Models) para isolar lógica de negócio da persistência.

### Validação de IDs

Optei por validação regex (`/^[a-zA-Z0-9_-]+$/`) ao invés de UUID fixo. Isso permite integração com sistemas legados (IDs numéricos) e bibliotecas modernas (shortId, nanoid, ULID), aumentando flexibilidade.

### Soft Delete

Middleware `pre('find')` do Mongoose filtra automaticamente registros com `canceledAt` preenchido. Garante que dados deletados não apareçam em listagens, mantendo histórico.

## Trade-offs

Priorizei documentação e infraestrutura robusta. Para v2:

### 1. Testes E2E
- Atualmente: testes unitários (Jest) cobrem Services
- Próximo: testes com supertest + mongodb-memory-server para validar fluxo HTTP completo

### 2. CI/CD
- Atualmente: roda localmente via Docker Compose
- Próximo: GitHub Actions para rodar testes/linter a cada push

### 3. Redis para cache
- **Por que não:** foco em funcionalidades core
- **Benefícios:**
  - Cache de contagem de notificações não lidas
  - Performance melhor em alta concorrência
  - Redução de carga no MongoDB
- **Implementação:**
  - Container Redis no docker-compose
  - Endpoint `GET /api/notifications/unread-count/:userId`
  - Invalidação de cache ao criar/ler/cancelar
  - TTL de 5-10 min
- **Estimativa:** 4-6h

### 4. Meteor.js
- **Decisão:** não usar
- **Motivo:** Express + TypeScript é mais adequado para APIs RESTful. Melhor suporte a TypeScript e ecossistema mais robusto para microsserviços. Meteor seria adequado para apps full-stack real-time, mas adicionaria complexidade desnecessária.

### 5. Segurança adicional
- Rate limiting (express-rate-limit)
- Helmet.js para headers
- CORS configurável
- **Estimativa:** 2-3h

### 6. Logging
- Winston/Pino para logs profissionais
- Integração com DataDog/ELK
- Auditoria de operações sensíveis
- **Estimativa:** 3-4h

### 7. Real-time
- WebSockets (Socket.io) para push notifications
- **Estimativa:** 6-8h
