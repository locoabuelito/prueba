const express = require('express');
const router = express.Router();

const user = require('../controller/userController');

// Creamos la ruta para las operaciones

router.get('/listar', user.list);
router.post('/crear', user.create);
router.get('/editar/:id', user.edit);
router.post('/editar/:id', user.update);
router.post('/borrar/:id', user.delete);
router.get('/ciudad', user.city);
module.exports = router;