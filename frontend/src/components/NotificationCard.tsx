import { motion } from 'framer-motion';
import { Check, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { Notification } from '../types';

interface NotificationCardProps {
  notification: Notification;
  index: number;
  onMarkAsRead: (id: string) => void;
  onRemove: (id: string) => void;
}

export function NotificationCard({ notification, index, onMarkAsRead, onRemove }: NotificationCardProps) {
  return (
    <motion.div
      key={notification._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ delay: index * 0.05 }}
      layout
      className={`group relative p-5 rounded-xl border transition-all duration-200 hover:shadow-md
        ${notification.read 
          ? 'bg-gray-50 border-gray-200' 
          : 'bg-white border-blue-200 shadow-sm border-l-4 border-l-blue-500'
        }
      `}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full
              ${notification.category === 'info' ? 'bg-blue-100 text-blue-700' : ''}
              ${notification.category === 'warning' ? 'bg-yellow-100 text-yellow-700' : ''}
              ${notification.category === 'error' ? 'bg-red-100 text-red-700' : ''}
              ${notification.category === 'success' ? 'bg-green-100 text-green-700' : ''}
              ${!['info', 'warning', 'error', 'success'].includes(notification.category) ? 'bg-gray-200 text-gray-700' : ''}
            `}>
              {notification.category}
            </span>
            <span className="text-xs text-gray-400">
              {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true, locale: ptBR })}
            </span>
            {!notification.read && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded-full font-bold"
              >
                NOVO
              </motion.span>
            )}
          </div>
          <p className={`text-sm leading-relaxed
            ${notification.read 
              ? 'text-gray-400 line-through decoration-gray-300' 
              : 'text-gray-800 font-medium'
            }`}
          >
            {notification.content}
          </p>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {!notification.read && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onMarkAsRead(notification._id)}
              data-tooltip="Marcar como lida"
              className="tooltip p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
            >
              <Check className="w-5 h-5" />
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onRemove(notification._id)}
            data-tooltip="Remover notificação"
            className="tooltip p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          >
            <Trash2 className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
