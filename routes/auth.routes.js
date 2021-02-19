const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth.controller');

const router = Router();

//Crear usuarios
router.post('/register',crearUsuario);

//Login usuarios
router.post('/login', [
    check('email').notEmpty().withMessage('El email es obligatorio')
                  .matches('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$').withMessage('Debe ingresar un correo valido'),
    check('password').notEmpty().withMessage('La contraseña es obligatoria')
], loginUsuario);

//Validar y revalidar el JWT
router.post('/valid', revalidarToken);


module.exports = router;