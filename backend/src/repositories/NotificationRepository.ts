import Notification, { INotification } from '../models/Notification';
import { CreateNotificationDTO } from '../interfaces/notification.dto';

class NotificationRepository {
  async create(data: CreateNotificationDTO): Promise<INotification> {
    const notification = new Notification(data);
    return await notification.save();
  }

  async findById(id: string): Promise<INotification | null> {
    return await Notification.findById(id);
  }

  // Listagem com Paginação
  async findManyByUserId(userId: string, page: number, limit: number): Promise<INotification[]> {
    return await Notification.find({ userId })
      .skip((page - 1) * limit) // Pula os itens das páginas anteriores
      .limit(limit)             // Limita a quantidade
      .sort({ createdAt: -1 }); // Ordena do mais recente para o mais antigo
  }

  async countByUserId(userId: string): Promise<number> {
    return await Notification.countDocuments({ userId });
  }

  async save(notification: INotification): Promise<INotification> {
    return await notification.save();
  }
}

export default new NotificationRepository();