import mongoose, { Schema, Document } from 'mongoose';

// Interface TypeScript para garantir tipagem no código
export interface INotification extends Document {
    userId: string;
    content: string;
    category: string;
    read: boolean;
    canceledAt?: Date | null; // O campo chave para o Soft Delete
    createdAt: Date;
    updatedAt: Date;
}

const NotificationSchema: Schema = new Schema(
    {
        userId: { 
            type: String, 
            required: true,
            index: true // Indexar melhora a performance da busca por usuário
        },
        content: { 
            type: String, 
            required: true 
        },
        category: { 
            type: String, 
            required: true 
        },
        read: { 
            type: Boolean, 
            default: false 
        },
        // Ao invés de deletar, preenchemos esta data
        canceledAt: { 
            type: Date, 
            default: null 
        }
    },
    {
        timestamps: true // Cria automaticamente createdAt e updatedAt
    }
);

// Middleware para aplicar Soft Delete automaticamente em todas as queries de find
NotificationSchema.pre(/^find/, function(this: any) {
    // Adiciona o filtro para não retornar documentos cancelados
    this.where({ canceledAt: null });
});

export default mongoose.model<INotification>('Notification', NotificationSchema);