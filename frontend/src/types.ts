export interface Notification {
    _id: string;
    userId: string;
    content: string;
    category: string;
    read: boolean;
    canceledAt: string | null;
    createdAt: string;
}

export interface PaginatedResponse {
    data: Notification[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}