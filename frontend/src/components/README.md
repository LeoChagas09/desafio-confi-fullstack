# 📦 Componentes

Componentes React modulares e reutilizáveis da aplicação de notificações.

## 🗂️ Estrutura

```
components/
├── LoginForm.tsx           # Tela de autenticação
├── Header.tsx              # Cabeçalho com usuário e logout
├── FilterPanel.tsx         # Busca e filtros
├── NotificationHeader.tsx  # Título da seção + refresh
├── NotificationList.tsx    # Lista de notificações
├── NotificationCard.tsx    # Card individual
├── Pagination.tsx          # Controles de paginação
└── DeleteConfirmModal.tsx  # Modal de confirmação
```

---

## 📋 Componentes

### `LoginForm`
**Responsabilidade:** Tela de login com animações

**Props:**
```typescript
interface LoginFormProps {
  onLogin: (userId: string) => Promise<void>;
}
```

**Features:**
- Form com input de userId
- Loading state durante login
- Animações de entrada com Framer Motion
- Gradient background

---

### `Header`
**Responsabilidade:** Navegação superior com informações do usuário

**Props:**
```typescript
interface HeaderProps {
  userId: string;
  unreadCount: number;
  onLogout: () => void;
}
```

**Features:**
- Ícone de sino com gradient
- Contador de não lidas
- Botão de logout
- Sticky no topo

---

### `FilterPanel`
**Responsabilidade:** Barra de busca e filtros de notificações

**Props:**
```typescript
interface FilterPanelProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterCategory: string;
  setFilterCategory: (value: string) => void;
  filterStatus: string;
  setFilterStatus: (value: string) => void;
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
}
```

**Features:**
- Input de busca com ícone e clear button
- Painel expansível de filtros
- Filtros por categoria (info, warning, error, success)
- Filtros por status (lida, não lida)
- Contador de filtros ativos
- Botão "Limpar filtros"

---

### `NotificationHeader`
**Responsabilidade:** Título da seção com botão de atualizar

**Props:**
```typescript
interface NotificationHeaderProps {
  count: number;
  onRefresh: () => void;
  loading: boolean;
}
```

**Features:**
- Barra lateral colorida com gradient
- Contador de notificações
- Botão refresh com ícone Lucide
- Estado de loading

---

### `NotificationList`
**Responsabilidade:** Renderização da lista de notificações com estados

**Props:**
```typescript
interface NotificationListProps {
  notifications: Notification[];
  loading: boolean;
  onMarkAsRead: (id: string) => void;
  onRemove: (id: string) => void;
  searchTerm: string;
  filterCategory: string;
  filterStatus: string;
}
```

**Features:**
- Loading spinner quando carregando
- Empty state quando sem notificações
- Empty state diferente para filtros ativos
- Lista animada com AnimatePresence
- Renderiza NotificationCard para cada item

---

### `NotificationCard`
**Responsabilidade:** Card individual de notificação

**Props:**
```typescript
interface NotificationCardProps {
  notification: Notification;
  index: number;
  onMarkAsRead: (id: string) => void;
  onRemove: (id: string) => void;
}
```

**Features:**
- Badge de categoria com cores específicas
- Timestamp relativo (ex: "há 2 minutos")
- Badge "NOVO" para não lidas
- Texto com line-through quando lida
- Botões de ação (marcar como lida, excluir) com tooltips
- Hover effects e animações
- Border lateral azul para não lidas

---

### `Pagination`
**Responsabilidade:** Controles de navegação entre páginas

**Props:**
```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
```

**Features:**
- Botões Anterior/Próxima com animações
- Indicador "Página X de Y"
- Disabled states automáticos
- Não renderiza se totalPages <= 1

---

### `DeleteConfirmModal`
**Responsabilidade:** Modal de confirmação para exclusão

**Props:**
```typescript
interface DeleteConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}
```

**Features:**
- Backdrop blur com animação fade
- Modal centralizado com scale animation
- Ícone AlertTriangle
- Botões Cancelar/Remover
- Fecha ao clicar no backdrop

---

## 🎨 Design System

### Cores
- **Primary:** Blue-500 → Indigo-600 (gradient)
- **Success:** Green-100/700
- **Warning:** Yellow-100/700
- **Error:** Red-100/700
- **Info:** Blue-100/700
- **Neutral:** Gray-50/100/200/700/800

### Espaçamentos
- Gap padrão: `gap-3` (12px)
- Padding card: `p-5` (20px)
- Border radius: `rounded-xl` (12px)

### Animações
- Hover scale: 1.05-1.1
- Tap scale: 0.9-0.95
- Duration: 0.2s
- Easing: framer-motion defaults

---

## ✅ Boas Práticas

1. **TypeScript Strict**: Todas as props tipadas
2. **Framer Motion**: Animações performáticas
3. **Tailwind CSS**: Utility-first styling
4. **Lucide Icons**: Ícones consistentes
5. **Accessibility**: Tooltips, disabled states, semântica HTML
6. **Responsive**: Mobile-first com breakpoints sm/md/lg

---

## 🔄 Reutilização

Componentes prontos para:
- Testes unitários (props bem definidas)
- Storybook (componentes isolados)
- Outras partes da aplicação
- Exportação para design system

---

**Criado em:** 26 de Novembro de 2025  
**Última atualização:** v1.3
