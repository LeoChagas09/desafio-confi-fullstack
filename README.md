# Desafio Técnico Fullstack - Gestão de Notificações

Solução completa para o desafio de sistema de notificações, contendo API (Backend) e Interface Web (Frontend).

## 📂 Estrutura do Projeto

O projeto está dividido em dois módulos principais:

* **[`/backend`](./backend)**: API RESTful em Node.js v22.
    * *Destaques:* Clean Architecture, Swagger, Soft Delete, Testes Unitários.
* **[`/frontend`](./frontend)**: Aplicação SPA em React (Vite).
    * *Destaques:* TailwindCSS, Consumo de API, Autenticação JWT.

## 🚀 Como Rodar Tudo (Quick Start)

### 1. Subir a Infraestrutura (Banco de Dados)
Entre na pasta do backend e inicie o MongoDB via Docker:
```bash
cd backend
docker compose up -d