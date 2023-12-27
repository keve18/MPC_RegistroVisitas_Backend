// const { mostrarRegistro, insertarRegistro, actualizarRegistro } = require('../models/registro.modelo');

const mostrarRegistroModelo = require('../models/registro.modelo');

const mostrarRegistro = async(req, res) => {
    try {
        const data = await mostrarRegistroModelo.mostrarRegistro(res);

    } catch (error) {
        console.error('Error en mostrarRegistro:', error);
    }
};




const insertarRegistro = async(req, res) => {
    try {
        // Verifica si req está definido y si req.body está presente
        const data = req && req.body ? req.body : null;
        if (!data) {
            return res.status(400).json({ error: 'Datos de solicitud no encontrados' });
        }
        await mostrarRegistroModelo.agregarRegistro(data);
        res.json({ message: 'Registro exitoso' });
    } catch (error) {
        console.error('Error en insertarRegistro:', error);
        res.status(500).json({ error: 'Error al insertar el registro' });
    }
};

const modificarRegistro = async(req, res) => {
    try {
        const id = req.params.id;
        const { h_salida } = req.body;

        console.log('estoy en el controlador:', h_salida);
        // Asegúrate de pasar los parámetros en el orden correcto
        await mostrarRegistroModelo.actualizarRegistro(id, h_salida);

        res.json({ message: 'Registro actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    mostrarRegistro,
    insertarRegistro,
    modificarRegistro
};