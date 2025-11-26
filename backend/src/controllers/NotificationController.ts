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
        return res.status(400).json({
          error: 'Validation error',
          details: error.issues // Agora o TS reconhece essa propriedade
        });
      }

      // Log do erro real no console para você debugar se precisar
      console.error(error);

      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const result = await NotificationService.listUserNotifications({
        userId,
        page,
        limit
      });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async read(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await NotificationService.readNotification(id);
      return res.status(204).send(); // 204 No Content (Sucesso sem corpo)
    } catch (error: any) {
      if (error.message === 'Notification not found') {
        return res.status(404).json({ error: 'Notification not found' });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async cancel(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await NotificationService.cancelNotification(id);
      return res.status(204).send();
    } catch (error: any) {
      if (error.message === 'Notification not found') {
        return res.status(404).json({ error: 'Notification not found' });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async login(req: Request, res: Response) {
    // Isso é apenas para simular um login e gerar o token para teste
    const { userId } = req.body;

    if (!userId) return res.status(400).json({ error: 'userId is required' });

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
    });

    return res.json({ token });
  }
}

export default new NotificationController();