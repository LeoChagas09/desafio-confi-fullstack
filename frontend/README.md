# Sistema de Notificações - Frontend

Frontend em React + TypeScript para consumir a API de notificações.

## Sobre

Aplicação que permite:

- Listar notificações paginadas
- Marcar como lida
- Remover notificações
- Login com JWT
- Filtros por conteúdo, categoria e status
- Animações com Framer Motion

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Axios (com interceptors JWT)
- date-fns (formatação de datas)
- lucide-react (ícones)
- Framer Motion (animações)
- react-hot-toast (notificações)

## Instalação

```bash
npm install
```

Crie um `.env` (opcional - padrão já é localhost:3000):

```env
VITE_API_URL=http://localhost:3000/api
```

Rode:

```bash
npm run dev
```

Acesse `http://localhost:5173`

## 🏗️ Build para Produção

Para gerar a versão otimizada para produção:

```bash
npm run build
```

Para visualizar o build localmente:

```bash
npm run preview
```

## Estrutura

```
src/
├── App.tsx              # Orquestração e lógica principal
├── api.ts               # Axios + interceptors JWT
├── types.ts             # Interfaces TypeScript
├── components/          # Componentes modulares (8 arquivos)
└── index.css            # Tailwind + tooltips customizados
```

## Uso

1. Faça login com um userId (ex: `usuario_teste`)
2. As notificações aparecem automaticamente
3. Use os filtros (busca, categoria, status) se necessário
4. Marque como lida (ícone check) ou remova (ícone lixeira)
5. Navegue entre páginas se houver mais de 5 notificações

## Decisões Técnicas

**TypeScript**: Type-safety ajuda bastante, especialmente nas interfaces da API

**Vite**: HMR é muito mais rápido que CRA

**Tailwind v4**: Prototipagem rápida, mas alguns recursos ainda em beta (bg-linear-to-*)

**useState local**: Suficiente pro escopo atual. Se crescer muito, migrar pra Context ou Zustand

**Componentização**: Quebrei o App.tsx em 8 componentes. Ficou mais organizado mas aumentou um pouco a complexidade

**localStorage**: Guarda o token JWT. Não é o mais seguro (XSS), mas funciona bem pra um MVP

**Framer Motion**: Deixa as animações bem mais suaves que CSS puro

## Testando

Certifique-se que o backend está rodando:

```bash
npm run start:dev
```

Crie notificações via Postman/Swagger:

```bash
POST http://localhost:3000/api/notifications
{
  "userId": "usuario_teste",
  "content": "Teste",
  "category": "info"
}
```

Faça login no frontend com o mesmo userId.

## Build

```bash
npm run build      # Build de produção
npm run preview    # Testar o build localmente
```

## Notas

Veja `NOTES.md` para trade-offs, decisões técnicas e o que não foi implementado por falta de tempo.
