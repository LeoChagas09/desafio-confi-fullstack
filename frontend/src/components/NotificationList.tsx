import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Loader2 } from 'lucide-react';
import type { Notification } from '../types';
import { NotificationCard } from './NotificationCard';

interface NotificationListProps {
  notifications: Notification[];
  loading: boolean;
  onMarkAsRead: (id: string) => void;
  onRemove: (id: string) => void;
  searchTerm: string;
  filterCategory: string;
  filterStatus: string;
}

export function NotificationList({
  notifications,
  loading,
  onMarkAsRead,
  onRemove,
  searchTerm,
  filterCategory,
  filterStatus,
}: NotificationListProps) {
  if (loading && notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="animate-spin text-blue-600 w-10 h-10 mb-4"/>
        <p className="text-gray-500 text-sm">Carregando notificações...</p>
      </div>
    );
  }

  if (notifications.length === 0) {
    const hasFilters = searchTerm || filterCategory !== 'all' || filterStatus !== 'all';
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200"
      >
        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Bell className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-600 font-medium mb-1">
          {hasFilters 
            ? 'Nenhuma notificação encontrada com esses filtros' 
            : 'Nenhuma notificação encontrada'}
        </p>
        <p className="text-sm text-gray-400">
          {hasFilters
            ? 'Tente ajustar os filtros'
            : 'Crie uma notificação via API para testar'}
        </p>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="popLayout">
      <div className="space-y-3">
        {notifications.map((notification, index) => (
          <NotificationCard
            key={notification._id}
            notification={notification}
            index={index}
            onMarkAsRead={onMarkAsRead}
            onRemove={onRemove}
          />
        ))}
      </div>
    </AnimatePresence>
  );
}
