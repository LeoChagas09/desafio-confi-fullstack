import axios from 'axios';

// Aponta para o seu backend local
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = axios.create({
    baseURL: API_URL,
});

// Interceptor: Pega o token do localStorage e coloca no Header de todas as requisições
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor de resposta: Detecta token expirado e faz logout automático
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Se receber 401 (Unauthorized), limpa o token e recarrega a página
        if (error.response?.status === 401) {
            const token = localStorage.getItem('auth_token');
            // Só faz logout se havia token (evita loop na tela de login)
            if (token) {
                console.warn('⚠️ Token expirado ou inválido. Fazendo logout...');
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user_id');
                window.location.reload();
            }
        }
        return Promise.reject(error);
    }
);