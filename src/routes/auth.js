import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../config/database.js';

const router = express.Router();

// Ruta de login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario por email
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        
        if (users.length === 0) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const user = users[0];

        // Verificar contraseña
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            'tu_secreto_jwt', // En producción, usar una variable de entorno
            { expiresIn: '1h' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                nombre: user.nombre,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Ruta de registro (solo para administradores)
router.post('/register', async (req, res) => {
    try {
        const { email, password, nombre = 'Administrador' } = req.body;

        // Verificar si el usuario ya existe
        const [existingUsers] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario
        const [result] = await pool.query(
            'INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)',
            [nombre, email, hashedPassword]
        );

        res.status(201).json({ 
            message: 'Usuario administrador creado exitosamente',
            userId: result.insertId 
        });

    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Ruta de verificación de token
router.get('/verify', async (req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'No hay token de autenticación' });
        }

        const decoded = jwt.verify(token, 'tu_secreto_jwt');
        
        // Verificar que el usuario existe en la base de datos
        const [users] = await pool.query('SELECT id, nombre, email FROM users WHERE id = ?', [decoded.id]);
        
        if (users.length === 0) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        res.json({ 
            valid: true, 
            user: users[0] 
        });

    } catch (error) {
        console.error('Error en verificación:', error);
        res.status(401).json({ message: 'Token inválido' });
    }
});

// Ruta de reset password (simulada)
router.post('/reset-password', async (req, res) => {
    try {
        const { email } = req.body;

        // Verificar si el usuario existe
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        
        if (users.length === 0) {
            // No revelar si el email existe o no por seguridad
            return res.json({ message: 'Si el email existe, recibirás un enlace para restablecer tu contraseña.' });
        }

        // En un entorno real, aquí enviarías un email con un enlace de reset
        // Por ahora, solo simulamos el enví
        res.json({ message: 'Si el email existe, recibirás un enlace para restablecer tu contraseña.' });

    } catch (error) {
        console.error('Error en reset password:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

export default router; 