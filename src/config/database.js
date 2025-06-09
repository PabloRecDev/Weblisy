import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // Por defecto en WAMP no hay contraseña
    database: 'weblisy', // Reemplaza esto con el nombre de tu base de datos
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Función para probar la conexión
export async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Conexión a la base de datos establecida correctamente');
        connection.release();
        return true;
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        return false;
    }
}

export { pool }; 