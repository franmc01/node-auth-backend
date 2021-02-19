const { Router } = require('express');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth.controller');

const router = Router();

//Crear usuarios
router.post('/register', crearUsuario);

//Login usuarios
router.post('/login', loginUsuario);

//Validar y revalidar el JWT
router.post('/valid', revalidarToken);


module.exports = router;