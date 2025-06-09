import { testConnection } from './config/database.js';

// Probar la conexión
testConnection()
    .then(success => {
        if (success) {
            console.log('La conexión a la base de datos está funcionando correctamente');
        } else {
            console.log('Hubo un problema al conectar con la base de datos');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    }); 