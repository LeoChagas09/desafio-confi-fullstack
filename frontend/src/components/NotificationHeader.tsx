import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

interface NotificationHeaderProps {
  count: number;
  onRefresh: () => void;
  loading: boolean;
}

export function NotificationHeader({ count, onRefresh, loading }: NotificationHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
        <div className="w-1 h-6 bg-linear-to-b from-blue-500 to-indigo-600 rounded-full"></div>
        {count} {count === 1 ? 'Notificação' : 'Notificações'}
      </h2>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onRefresh} 
        disabled={loading}
        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-medium disabled:opacity-50"
      >
        <RefreshCw className="w-4 h-4" />
        Atualizar
      </motion.button>
    </div>
  );
}
