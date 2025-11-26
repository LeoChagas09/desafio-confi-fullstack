/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useMemo } from 'react';
import { api } from './api';
import type { Notification, PaginatedResponse } from './types';
import toast, { Toaster } from 'react-hot-toast';
import { LoginForm } from './components/LoginForm';
import { Header } from './components/Header';
import { FilterPanel } from './components/FilterPanel';
import { NotificationHeader } from './components/NotificationHeader';
import { NotificationList } from './components/NotificationList';
import { Pagination } from './components/Pagination';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';

function App() {
  const [userId, setUserId] = useState(localStorage.getItem('user_id') || '');
  const [token, setToken] = useState(localStorage.getItem('auth_token') || '');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // === FILTROS ===
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // === MODAL DE CONFIRMAÇÃO ===
  const [deleteConfirm, setDeleteConfirm] = useState<{show: boolean; id: string | null}>({show: false, id: null});

  // === FILTROS COMPUTADOS ===
  const filteredNotifications = useMemo(() => {
    return notifications.filter(notif => {
      // Filtro por conteúdo
      const matchesSearch = notif.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtro por categoria
      const matchesCategory = filterCategory === 'all' || notif.category === filterCategory;
      
      // Filtro por status
      const matchesStatus = 
        filterStatus === 'all' || 
        (filterStatus === 'read' && notif.read) || 
        (filterStatus === 'unread' && !notif.read);
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [notifications, searchTerm, filterCategory, filterStatus]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // === LOGIN ===
  const handleLogin = async (loginUserId: string) => {
    const res = await api.post('/notifications/login', { userId: loginUserId });
    
    const newToken = res.data.token;
    localStorage.setItem('auth_token', newToken);
    localStorage.setItem('user_id', loginUserId);
    
    setUserId(loginUserId);
    setToken(newToken);
    await fetchNotifications(1);
    toast.success('Login realizado com sucesso!');
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_id');
    setToken('');
    setNotifications([]);
  };

  // === BUSCAR NOTIFICAÇÕES ===
  const fetchNotifications = async (pageNum: number) => {
    try {
      setLoading(true);
      const res = await api.get<PaginatedResponse>(`/notifications/from/${userId}`, {
        params: { page: pageNum, limit: 5 }
      });
      setNotifications(res.data.data);
      setTotalPages(res.data.meta.totalPages);
      setPage(pageNum);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // === AÇÕES ===
  const markAsRead = async (id: string) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
      toast.success('Notificação marcada como lida');
    } catch (error) {
      toast.error('Erro ao marcar como lida');
    }
  };

  const removeNotification = async (id: string) => {
    setDeleteConfirm({show: true, id});
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.id) return;
    try {
      await api.delete(`/notifications/${deleteConfirm.id}`);
      setNotifications(prev => prev.filter(n => n._id !== deleteConfirm.id));
      toast.success('Notificação removida com sucesso');
      setDeleteConfirm({show: false, id: null});
    } catch (error) {
      toast.error('Erro ao remover notificação');
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm({show: false, id: null});
  };

  useEffect(() => {
    if (token && userId) fetchNotifications(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // === TELA DE LOGIN ===
  if (!token) {
    return <LoginForm onLogin={handleLogin} />;
  }

  // === DASHBOARD ===
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        userId={userId}
        unreadCount={unreadCount}
        onLogout={handleLogout}
      />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <FilterPanel
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />

        <NotificationHeader 
          count={filteredNotifications.length}
          onRefresh={() => fetchNotifications(page)}
          loading={loading}
        />

        <NotificationList
          loading={loading}
          notifications={filteredNotifications}
          searchTerm={searchTerm}
          filterCategory={filterCategory}
          filterStatus={filterStatus}
          onMarkAsRead={markAsRead}
          onRemove={removeNotification}
        />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={fetchNotifications}
        />
      </main>

      <DeleteConfirmModal
        isOpen={deleteConfirm.show}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#374151',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}

export default App;