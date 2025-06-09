import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { pool } from '../config/database.js';

const router = express.Router();

// Proteger todas las rutas de admin
router.use(authMiddleware);

// Obtener datos del panel de admin
router.get('/dashboard', async (req, res) => {
    try {
        // Aquí puedes agregar la lógica para obtener datos del dashboard
        res.json({
            message: 'Panel de administración',
            user: req.user
        });
    } catch (error) {
        console.error('Error en dashboard:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

export default router; 