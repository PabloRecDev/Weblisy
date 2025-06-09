import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ message: 'API funcionando correctamente' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
}); 