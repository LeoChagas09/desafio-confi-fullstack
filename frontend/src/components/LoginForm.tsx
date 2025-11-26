import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, LogIn, Loader2 } from 'lucide-react';

interface LoginFormProps {
  onLogin: (userId: string) => Promise<void>;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [userId, setUserId] = useState(localStorage.getItem('user_id') || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateUserId = (value: string): string => {
    if (value.length < 6) {
      return 'O userId deve ter no mínimo 6 caracteres';
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
      return 'Use apenas letras, números, - ou _';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação client-side
    const validationError = validateUserId(userId);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setError('');
    setLoading(true);
    try {
      await onLogin(userId);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="flex justify-center mb-6"
        >
          <div className="bg-linear-to-br from-blue-500 to-indigo-600 p-4 rounded-2xl shadow-lg">
            <Bell className="w-10 h-10 text-white" />
          </div>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-center mb-2 bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
        >
          Notificações
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-500 text-sm mb-8"
        >
          Entre para visualizar suas notificações
        </motion.p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-semibold text-gray-700 mb-2">ID de Usuário</label>
            <input 
              type="text" 
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
                setError(''); // Limpa erro ao digitar
              }}
              placeholder="Ex: usuario_teste"
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                error ? 'border-red-300 bg-red-50' : 'border-gray-200'
              }`}
              required 
            />
            {error && (
              <p className="text-red-500 text-xs mt-1.5 font-medium">{error}</p>
            )}
          </motion.div>
          <motion.button 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            disabled={loading}
            className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 font-medium"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5"/> : <LogIn className="w-5 h-5" />}
            {loading ? 'Entrando...' : 'Entrar'}
          </motion.button>
        </form>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 text-center text-xs text-gray-400"
        >
          Sistema de Gestão de Notificações v1.0
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
