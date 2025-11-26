import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    // O formato é "Bearer <token>"
    const [, token] = authHeader.split(' ');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        
        // Se quiser injetar o ID do usuário na requisição para usar no controller:
        // req.userId = (decoded as any).id; 
        
        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};