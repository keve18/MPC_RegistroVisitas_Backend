const mysql = require('mysql2/promise');

const bd = mysql.createPool({
    host: process.env.HOST || process.env.HOSTD,
    user: process.env.USER || process.env.USERD,
    password: process.env.PASS || process.env.PASSD,
    database: process.env.BD || process.env.BDD,
    connectionLimit: 10, // Establecer el límite de conexiones
    waitForConnections: true, // Permitir esperar si se alcanza el límite
    acquireTimeout: 100000, // Establecer el tiempo de espera en milisegundos
});

// Manejar evento de adquisición de conexión
bd.on('acquire', function(connection) {
    console.log('Conexión adquirida desde el pool - ID: ' + connection.threadId);
});

// Manejar evento de conexión
bd.on('connection', function(connection) {
    console.log('Nueva conexión creada - ID: ' + connection.threadId);
});

// Manejar evento de error
bd.on('error', function(err) {
    console.error('Error en el pool de conexiones: ' + err.message);
});

// Manejar evento de conexión liberada
bd.on('release', function(connection) {
    console.log('Conexión liberada de nuevo al pool - ID: ' + connection.threadId);
});

module.exports = { bd };