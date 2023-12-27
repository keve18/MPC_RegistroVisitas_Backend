const express = require('express');
const router = express.Router()

// const { mostrar, postRegistro, putRegistro } = require('../controllers/registro.controller');

const { mostrarRegistro, insertarRegistro, modificarRegistro } = require('../controllers/registro.controller');



router.get('/', mostrarRegistro);
router.post('/', insertarRegistro);
router.put('/:id', modificarRegistro);

module.exports = router;