import NotificationService from './NotificationService';
import NotificationRepository from '../repositories/NotificationRepository';

// O Segredo: Dizemos ao Jest para "fingir" que este arquivo existe
// Assim, não precisamos de banco de dados real rodando.
jest.mock('../repositories/NotificationRepository');

describe('NotificationService', () => {

  // Antes de cada teste, limpamos os mocks para não ter "sujeira"
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar uma notificação com sucesso', async () => {
    // ARRANGE (Preparar)
    const mockData = {
      userId: 'user_123',
      content: 'Você recebeu um novo like',
      category: 'social'
    };

    // Simulamos que o Repository retorna o dado salvo
    (NotificationRepository.create as jest.Mock).mockResolvedValue({
      ...mockData,
      _id: 'mock_id',
      read: false,
      createdAt: new Date()
    });

    // ACT (Agir)
    const result = await NotificationService.sendNotification(mockData);

    // ASSERT (Verificar)
    expect(NotificationRepository.create).toHaveBeenCalledTimes(1);
    expect(NotificationRepository.create).toHaveBeenCalledWith(mockData);
    expect(result).toHaveProperty('_id');
  });

  it('deve marcar uma notificação como lida', async () => {
    // ARRANGE
    const mockNotification = {
      _id: 'notif_123',
      read: false,
      save: jest.fn() // Simulamos a função .save() do Mongoose
    };

    // Simulamos que o Repository encontrou a notificação
    (NotificationRepository.findById as jest.Mock).mockResolvedValue(mockNotification);

    // ACT
    await NotificationService.readNotification('notif_123');

    // ASSERT
    expect(NotificationRepository.findById).toHaveBeenCalledWith('notif_123');
    // Verifica se mudou o status para true
    expect(mockNotification.read).toBe(true);
    // Verifica se chamou o save para persistir no banco
    expect(NotificationRepository.save).toHaveBeenCalledTimes(1);
  });

  it('deve lançar erro ao tentar ler uma notificação inexistente', async () => {
    // ARRANGE
    // Simulamos que não achou nada (null)
    (NotificationRepository.findById as jest.Mock).mockResolvedValue(null);

    // ACT & ASSERT
    // Esperamos que a chamada exploda com um erro
    await expect(NotificationService.readNotification('fake_id'))
      .rejects
      .toThrow('Notification not found');
  });

  it('deve cancelar uma notificação (soft delete)', async () => {
    // ARRANGE
    const mockNotification = {
      _id: 'notif_456',
      canceledAt: null,
      save: jest.fn()
    };

    // Simulamos que o Repository encontrou a notificação
    (NotificationRepository.findById as jest.Mock).mockResolvedValue(mockNotification);

    // ACT
    await NotificationService.cancelNotification('notif_456');

    // ASSERT
    expect(NotificationRepository.findById).toHaveBeenCalledWith('notif_456');
    // Verifica se o canceledAt foi preenchido com uma data
    expect(mockNotification.canceledAt).toBeInstanceOf(Date);
    // Verifica se chamou o save para persistir no banco
    expect(NotificationRepository.save).toHaveBeenCalledTimes(1);
  });

  it('deve lançar erro ao tentar cancelar uma notificação inexistente', async () => {
    // ARRANGE
    (NotificationRepository.findById as jest.Mock).mockResolvedValue(null);

    // ACT & ASSERT
    await expect(NotificationService.cancelNotification('fake_id'))
      .rejects
      .toThrow('Notification not found');
  });
});