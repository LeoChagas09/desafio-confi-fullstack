import express from 'express';
import cors from 'cors';
import notificationRoutes from './routes/notification.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';

const app = express();

app.use(express.json()); // Para entender JSON no body
app.use(cors());

// Rota da Documentação
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/notifications', notificationRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'API de Notificações rodando!' });
});

export default app;