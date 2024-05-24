// Creación y configuración del server
const http = require('node:http');

const app = require('./src/app');

// Configuración de .env
require('dotenv').config();

// Configuración de la conexión a BBDD
require ('./src/config/db')

// Creación del Server
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

// Creación del listener
server.listen(PORT);

server.on('listening', () => {
    console.log (`Servidor en escucha en el puerto ${PORT
    }`)
})