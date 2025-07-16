import bcrypt from 'bcryptjs';
import { pool } from '../config/database.js';

async function createAdminUser() {
    try {
        // Verificar si la tabla users existe, si no, crearla
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(255) NOT NULL,
                email VARCHAR(191) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Crear usuario administrador de prueba
        const hashedPassword = await bcrypt.hash('admin123', 10);
        
        // Verificar si el usuario ya existe
        const [existingUsers] = await pool.query('SELECT * FROM users WHERE email = ?', ['admin@weblisy.com']);
        
        if (existingUsers.length > 0) {
            console.log('El usuario administrador ya existe');
            console.log('Email: admin@weblisy.com');
            console.log('Contraseña: admin123');
        } else {
            await pool.query(
                'INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)',
                ['Administrador', 'admin@weblisy.com', hashedPassword]
            );

            console.log('Usuario administrador creado exitosamente');
            console.log('Email: admin@weblisy.com');
            console.log('Contraseña: admin123');
        }
        
        process.exit(0);
    } catch (error) {
        console.error('Error al crear usuario administrador:', error);
        process.exit(1);
    }
}

createAdminUser(); 