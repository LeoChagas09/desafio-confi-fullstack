export interface CreateNotificationDTO {
    userId: string;
    content: string;
    category: string;
}

export interface ListNotificationDTO {
    userId: string;
    page?: number;
    limit?: number;
}