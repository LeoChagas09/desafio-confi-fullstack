import { Request, Response } from 'express';
import NotificationService from '../services/NotificationService';
import { z, ZodError } from 'zod'; // Vamos usar Zod para validar a entrada, é mais moderno e seguro
import jwt from 'jsonwebtoken';

class NotificationController {

  async create(req: Request, res: Response) {
    try {
      // Validação do Payload
      const createSchema = z.object({
        userId: z.string().min(6).regex(/^[a-zA-Z0-9_-]+$/, { 
            message: "O ID deve conter apenas letras, números, - ou _" 
        }),
        content: z.string().min(5),
        category: z.string().min(3)
      });

      const { userId, content, category } = createSchema.parse(req.body);

      const notification = await NotificationService.sendNotification({
        userId,
        content,
        category
      });

      // HTTP 201 Created
      return res.status(201).json({ notification });
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.log('❌ [CREATE] Erro de validação:', error.issues);
        return res.status(400).json({
          error: 'Validation error',
          details: error.issues
        });
      }

      console.error('❌ [CREATE] Erro interno:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async list(req: Request, res: Response) {
    try {
      // Validação do userId no path
      const paramsSchema = z.object({
        userId: z.string().min(3).regex(/^[a-zA-Z0-9_-]+$/, { 
          message: "O userId deve conter apenas letras, números, - ou _" 
        })
      });

      const { userId } = paramsSchema.parse(req.params);
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const result = await NotificationService.listUserNotifications({
        userId,
        page,
        limit
      });

      return res.status(200).json(result);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.log('❌ [LIST] Erro de validação no userId:', error.issues);
        return res.status(400).json({
          error: 'Validation error',
          details: error.issues
        });
      }
      console.error('❌ [LIST] Erro interno:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async read(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await NotificationService.readNotification(id);
      return res.status(204).send(); // 204 No Content (Sucesso sem corpo)
    } catch (error: any) {
      if (error.message === 'Notification not found') {
        console.log('⚠️  [READ] Notificação não encontrada:', id);
        return res.status(404).json({ error: 'Notification not found' });
      }
      console.error('❌ [READ] Erro interno:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async cancel(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await NotificationService.cancelNotification(id);
      return res.status(204).send();
    } catch (error: any) {
      if (error.message === 'Notification not found') {
        console.log('⚠️  [CANCEL] Notificação não encontrada:', id);
        return res.status(404).json({ error: 'Notification not found' });
      }
      console.error('❌ [CANCEL] Erro interno:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      // Validação do userId no login
      const loginSchema = z.object({
        userId: z.string().min(3).regex(/^[a-zA-Z0-9_-]+$/, { 
          message: "O userId deve conter apenas letras, números, - ou _" 
        })
      });

      const { userId } = loginSchema.parse(req.body);

      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
        expiresIn: '1d',
      });

      console.log('✅ [LOGIN] Usuário autenticado:', userId);
      return res.json({ token });
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.log('❌ [LOGIN] Erro de validação:', error.issues);
        return res.status(400).json({
          error: 'Validation error',
          details: error.issues
        });
      }
      console.error('❌ [LOGIN] Erro interno:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new NotificationController();