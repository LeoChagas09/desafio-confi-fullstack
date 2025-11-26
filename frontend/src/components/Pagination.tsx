import { motion } from 'framer-motion';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-3 mt-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer font-medium text-sm"
      >
        ← Anterior
      </motion.button>
      <div className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
        <span className="text-sm font-semibold text-gray-700">Página {currentPage}</span>
        <span className="text-xs text-gray-400">de {totalPages}</span>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer font-medium text-sm"
      >
        Próxima →
      </motion.button>
    </div>
  );
}
