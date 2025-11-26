# NOTES - Decisões Técnicas e Trade-offs

## O que foi feito

### Básico
- SPA em React + TypeScript
- API REST (listar, marcar lida, remover)
- Status visual (lida/não lida)
- Paginação
- Código organizado

### Extras
- Login JWT persistente
- Tailwind CSS v4
- Variáveis de ambiente
- Axios interceptors
- Formatação de datas (date-fns)
- Filtros (busca, categoria, status)
- Animações (Framer Motion)
- Toast notifications (react-hot-toast)
- Modal customizado

## Trade-offs

### 1. useState vs Redux/Zustand

**Escolha:** `useState` local

Por quê: App pequeno, sem necessidade de estado global complexo. Se crescer muito, migrar.

---

### 2. Componentização

**Escolha:** Componentes modulares (v1.3)

Estrutura:
```
components/
├── LoginForm.tsx
├── Header.tsx
├── FilterPanel.tsx
├── NotificationHeader.tsx
├── NotificationList.tsx
├── NotificationCard.tsx
├── Pagination.tsx
└── DeleteConfirmModal.tsx
```

App.tsx virou orquestrador (~200 linhas). Melhor pra manutenção.

---

### 3. Tailwind inline vs CSS Modules

**Escolha:** Tailwind inline + CSS customizado (tooltips)

Por quê: Rápido pra prototipar. CSS puro só pra tooltips porque Tailwind v4 não tem solução nativa ainda.

---

### 4. localStorage vs Cookies

**Escolha:** localStorage

Por quê: Simples, funciona bem pra MVP. Mas fica vulnerável a XSS. Ideal seria HttpOnly cookies.

---

## O que não foi feito (falta de tempo)

### Testes
Vitest + React Testing Library seria o ideal. Testes pelo menos nos componentes e nas funções de filtro.

### WebSocket/SSE
Notificações em tempo real deixaria mais moderno. Socket.io no backend + hook useEffect no front.

### Dark Mode
Só adicionar uma classe no Tailwind e toggle no localStorage. Fácil mas não prioritário.

### PWA
Service workers pra funcionar offline + notificações nativas do OS.

---

## Por que não Meteor.js?

O desafio mencionava como diferencial mas não usei porque:

1. Backend já existe separado (API REST)
2. Vite + React é mais atual e tem ecosystem maior
3. Meteor é full-stack opinionado, seria overhead
4. Mais gente no mercado conhece React puro

Se fosse usar: Tracker pra reatividade + DDP ao invés de REST seria legal.

---

## Próximos passos

Curto prazo:
- Testes unitários
- Error boundaries
- Melhorar acessibilidade (ARIA labels)

Médio prazo:
- WebSocket pra real-time
- Dark mode
- Skeleton loading

Longo prazo:
- PWA
- i18n
- Code splitting

---

## Changelog

### v1.3

- Componentizou App.tsx em 8 arquivos
- Toasts ao invés de alerts nativos
- Modal customizado pra confirmação
- App.tsx de 500 linhas → 200 linhas

### v1.2

- Tooltips CSS customizados
- Ícone Lucide no refresh
- Animação scale nos botões

### v1.1

- Sistema de filtros (busca, categoria, status)
- Framer Motion
- Painel expansível
- useMemo pra performance

