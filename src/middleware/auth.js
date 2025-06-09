import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'No hay token de autenticación' });
        }

        const decoded = jwt.verify(token, 'tu_secreto_jwt'); // Usar la misma clave que en auth.js
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
}; 