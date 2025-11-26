import { Bell } from 'lucide-react';

interface HeaderProps {
  userId: string;
  unreadCount: number;
  onLogout: () => void;
}

export function Header({ userId, unreadCount, onLogout }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10 border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-linear-to-br from-blue-500 to-indigo-600 p-2 rounded-xl">
            <Bell className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-gray-800">Notificações</h1>
            <p className="text-xs text-gray-500">
              {unreadCount > 0 ? `${unreadCount} não lida${unreadCount > 1 ? 's' : ''}` : 'Tudo em dia! 🎉'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
            <span className="text-xs text-gray-500">Olá,</span>
            <span className="text-sm font-semibold text-gray-700">{userId}</span>
          </div>
          <button 
            onClick={onLogout} 
            className="text-sm text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-medium"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
