const { bd } = require('../sql/config');

// ENTIDADES PARA REGISTRO
class Registro {
    constructor(fecha, h_ingreso, visitante, tipo_persona, tipo_doc,
        institucion, mot_visita, emp_publico, of_visitada, h_salida) {
        this.fecha = fecha,
            this.h_ingreso = h_ingreso,
            this.visitante = visitante,
            this.tipo_persona = tipo_persona,
            this.tipo_doc = tipo_doc,
            this.institucion = institucion,
            this.mot_visita = mot_visita,
            this.emp_publico = emp_publico,
            this.of_visitada = of_visitada,
            this.h_salida = h_salida
    }

};

const mostrarRegistro = async(res) => {
    try {
        if (!process.env.OBTENER_REGISTROS) {
            throw new Error('La variable de entorno OBTENER_REGISTROS no está definida.');
        }
        const [rows, fields] = await bd.execute(process.env.OBTENER_REGISTROS);
        if (!rows || rows.length === 0) {
            res.json('No hay registros por el momento');
        } else {
            // Usa 'res' para enviar la respuesta JSON
            res.json(rows[0]);
        }
    } catch (error) {
        console.error('Error en mostrarRegistro:', error.message);
        throw error; // Lanza el error para que el controlador pueda manejarlo
    }
};

const agregarRegistro = async(data) => {
    try {
        const {
            fecha,
            h_ingreso,
            visitante,
            tipo_persona,
            tipo_doc,
            institucion,
            mot_visita,
            emp_publico,
            of_visitada,
            h_salida
        } = data;

        // Verifica que no haya valores undefined
        if (
            fecha === undefined ||
            h_ingreso === undefined ||
            visitante === undefined ||
            tipo_persona === undefined ||
            tipo_doc === undefined ||
            institucion === undefined ||
            mot_visita === undefined ||
            emp_publico === undefined ||
            of_visitada === undefined ||
            h_salida === undefined
        ) {
            throw new Error('Todos los parámetros deben estar definidos');
        }

        // Utiliza las propiedades del objeto `data` en lugar de las variables no definidas
        const nvoRegistro = new Registro(
            fecha,
            h_ingreso,
            visitante,
            tipo_persona,
            tipo_doc,
            institucion,
            mot_visita,
            emp_publico,
            of_visitada,
            h_salida
        );

        // Resto del código...

        const [results] = await bd.execute(process.env.INSERTAR_REGISTRO, [
            nvoRegistro.fecha,
            nvoRegistro.h_ingreso,
            nvoRegistro.visitante,
            nvoRegistro.tipo_persona,
            nvoRegistro.tipo_doc,
            nvoRegistro.institucion,
            nvoRegistro.mot_visita,
            nvoRegistro.emp_publico,
            nvoRegistro.of_visitada,
            nvoRegistro.h_salida
        ]);

        console.log('Registro Exitoso...!', results);
        return results;
    } catch (error) {
        console.error('Error en insertarRegistro:', error.message);
        throw error;
    }
};



// const actualizarRegistro = async(id, data) => {
//     const results = await bd.execute(process.env.ACTUALIZAR_HRA_SALIDA, [id, data]);
//     console.log('Registro Actualizado...!', results);
//     return results;
// };

const actualizarRegistro = async(id, h_salida) => {
    try {
        if (!process.env.ACTUALIZAR_HRA_SALIDA) {
            throw new Error('La variable de entorno ACTUALIZAR_HRA_SALIDA no está definida.');
        }
        console.log('estoy dentro del modelo:', '', 'codigo:', id, 'dato enviado:',
            h_salida);
        const sql = process.env.ACTUALIZAR_HRA_SALIDA;
        const [results] = await bd.execute(sql, [id, h_salida]);

        console.log('Registro Actualizado...!', results);
        return results;
    } catch (error) {
        console.error('Error en actualizarRegistro:', error.message);
        throw error;
    }
};


module.exports = { Registro, mostrarRegistro, agregarRegistro, actualizarRegistro };