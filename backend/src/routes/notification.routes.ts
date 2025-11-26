import { Router } from 'express';
import NotificationController from '../controllers/NotificationController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID automático do MongoDB
 *         userId:
 *           type: string
 *           description: ID do usuário (ShortID ou String)
 *         content:
 *           type: string
 *           description: Texto da notificação
 *         category:
 *           type: string
 *           description: Categoria da notificação
 *         read:
 *           type: boolean
 *           description: Se foi lida ou não
 *         canceledAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Data de cancelamento (Soft Delete)
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticação (Mock para teste)
 */

/**
 * @swagger
 * /notifications/login:
 *   post:
 *     summary: Gera um token JWT para teste (Mock)
 *     tags: [Auth]
 *     description: Como não temos cadastro, gera um token baseado no userId informado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "user_123"
 *     responses:
 *       200:
 *         description: Token gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */
router.post('/login', NotificationController.login);

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Gerenciamento de Notificações
 */

/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Cria uma nova notificação
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - content
 *               - category
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID do usuário (alfanumérico, min 6 chars)
 *                 example: "user_123"
 *               content:
 *                 type: string
 *                 minLength: 5
 *                 example: "Você recebeu uma nova mensagem"
 *               category:
 *                 type: string
 *                 minLength: 3
 *                 example: "social"
 *     responses:
 *       201:
 *         description: Notificação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 notification:
 *                   $ref: '#/components/schemas/Notification'
 *       400:
 *         description: Erro de validação
 *       401:
 *         description: Token não fornecido ou inválido
 */
router.post('/', authMiddleware, NotificationController.create);

/**
 * @swagger
 * /notifications/from/{userId}:
 *   get:
 *     summary: Lista notificações de um usuário (Paginada)
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Itens por página
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Notification'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       401:
 *         description: Token não fornecido ou inválido
 */
router.get('/from/:userId', authMiddleware, NotificationController.list);

/**
 * @swagger
 * /notifications/{id}/read:
 *   patch:
 *     summary: Marca uma notificação como lida
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da notificação (MongoDB _id)
 *     responses:
 *       204:
 *         description: Sucesso (Sem conteúdo)
 *       404:
 *         description: Notificação não encontrada
 *       401:
 *         description: Token não fornecido ou inválido
 */
router.patch('/:id/read', authMiddleware, NotificationController.read);

/**
 * @swagger
 * /notifications/{id}:
 *   delete:
 *     summary: Cancela uma notificação (Soft Delete)
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     description: A notificação não é removida do banco, apenas marcada com 'canceledAt'.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da notificação (MongoDB _id)
 *     responses:
 *       204:
 *         description: Sucesso (Sem conteúdo)
 *       404:
 *         description: Notificação não encontrada
 *       401:
 *         description: Token não fornecido ou inválido
 */
router.delete('/:id', authMiddleware, NotificationController.cancel);

export default router;