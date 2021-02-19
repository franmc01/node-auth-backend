const { Router } = require('express');

const router = Router();

//Crear usuarios
router.post('/register', (req, res) => {
    return res.json({
        status: true,
        msg: ' Esta ruta creara a los usuarios'
    })
});

//Login usuarios
router.post('/login', (req, res) => {
    return res.json({
        status: true,
        msg: ' Esta ruta logeara a los usuarios'
    })
});


//Validar y revalidar el JWT
router.post('/valid', (req, res) => {
    return res.json({
        status: true,
        msg: ' Esta ruta validará los JWT'
    })
});

module.exports = router;