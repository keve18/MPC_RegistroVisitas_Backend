require('dotenv').config();

const express = require("express");
const cors = require('cors')

const bd = require('./src/sql/config');

// CREAR SERVIDOR DE EXPRESS
const app = express();

// Configurar CORS
app.use(cors());
app.use(express.json());

// RUTAS
app.use('/api/registro', require('./src/routes/registro.router'));

// PUERTO DONDE ESTÁ CORRIENDO EL BACKEND
const PORT = process.env.PORT || 3000;

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});