import bcrypt from 'bcryptjs';
import { pool } from '../config/database.js';

async function createTestUser() {
    try {
        // Primero, eliminar la tabla si existe
        await pool.query('DROP TABLE IF EXISTS users');

        // Crear la tabla users con la estructura correcta
        await pool.query(`
            CREATE TABLE users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(255) NOT NULL,
                email VARCHAR(191) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Crear usuario de prueba
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await pool.query(
            'INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)',
            ['Administrador', 'admin@example.com', hashedPassword]
        );

        console.log('Usuario de prueba creado exitosamente');
        console.log('Email: admin@example.com');
        console.log('Contraseña: admin123');
        
        process.exit(0);
    } catch (error) {
        console.error('Error al crear usuario de prueba:', error);
        process.exit(1);
    }
}

createTestUser(); 