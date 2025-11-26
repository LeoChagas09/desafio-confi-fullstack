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
      className={`group relative p-5 rounded-xl border transition-all duration-300 hover:shadow-lg
        ${notification.read 
          ? 'bg-white border-gray-200 opacity-75 hover:opacity-90' 
          : 'bg-linear-to-br from-white to-blue-50 border-blue-300 shadow-md border-l-4 border-l-blue-600'
        }
      `}
    >
      {/* Indicador visual de status */}
      <div className="absolute top-3 right-3">
        {notification.read ? (
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-full border border-gray-300">
            <Check className="w-3 h-3 text-gray-500" />
            <span className="text-[10px] font-semibold text-gray-600 uppercase tracking-wide">Lida</span>
          </div>
        ) : (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-500 rounded-full shadow-sm"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-2 h-2 bg-white rounded-full"
            />
            <span className="text-[10px] font-bold text-white uppercase tracking-wide">Nova</span>
          </motion.div>
        )}
      </div>

      <div className="flex justify-between items-start gap-4 pr-20">
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
            <span className={`text-xs ${notification.read ? 'text-gray-400' : 'text-gray-500 font-medium'}`}>
              {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true, locale: ptBR })}
            </span>
          </div>
          <p className={`text-sm leading-relaxed transition-colors
            ${notification.read 
              ? 'text-gray-500' 
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
