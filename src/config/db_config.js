const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0
    },

    jwt= {
        secret: process.env.JWT_SECRET || 'your-super-secret-key',
        expiresIn: process.env.JWT_EXPIRES || '24h'
    
    },
    
    // Configuración del servidor
    server= {
        port: process.env.PORT || 3000
    },

    );

module.exports = connection.promise();