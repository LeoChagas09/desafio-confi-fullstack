import app from './app';
import dotenv from 'dotenv';
import connectDB from './config/database';

dotenv.config(); // Carrega variáveis de ambiente [cite: 22]

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB(); // Conecta ao banco de dados
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao iniciar servidor:', error);
        process.exit(1);
    }
};

startServer();