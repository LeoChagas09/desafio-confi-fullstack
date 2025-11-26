import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        const uri = process.env.MONGO_URI || '';
        
        if (!uri) {
            throw new Error('MONGO_URI não definida no .env');
        }

        await mongoose.connect(uri);
        console.log('📦 MongoDB conectado com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao conectar no MongoDB:', error);
        process.exit(1); // Encerra a aplicação se o banco não subir
    }
};

export default connectDB;