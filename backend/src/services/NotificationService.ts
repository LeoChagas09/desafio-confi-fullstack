import NotificationRepository from '../repositories/NotificationRepository';
import { CreateNotificationDTO, ListNotificationDTO } from '../interfaces/notification.dto';

class NotificationService {

  async sendNotification(data: CreateNotificationDTO) {
    // Regra de negócio: Poderíamos validar se o usuário existe em outro microsserviço aqui
    return await NotificationRepository.create(data);
  }

  async listUserNotifications({ userId, page = 1, limit = 10 }: ListNotificationDTO) {
    const notifications = await NotificationRepository.findManyByUserId(userId, page, limit);
    const total = await NotificationRepository.countByUserId(userId);

    return {
      data: notifications,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async readNotification(id: string) {
    const notification = await NotificationRepository.findById(id);

    if (!notification) {
      throw new Error('Notification not found');
    }

    notification.read = true;
    await NotificationRepository.save(notification);
  }

  async cancelNotification(id: string) {
    const notification = await NotificationRepository.findById(id);

    if (!notification) {
      throw new Error('Notification not found');
    }

    // Soft Delete: Apenas preenchemos a data de cancelamento
    notification.canceledAt = new Date();
    await NotificationRepository.save(notification);
  }
}

export default new NotificationService();