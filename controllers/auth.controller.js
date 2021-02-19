const { request, response } = require('express');
const { validationResult } = require('express-validator');


//Controlador de la ruta de register
const crearUsuario = (req = request, resp = response) => {

    const { names, email, password } = req.body;
    console.log(names, email, password);

    return resp.json({
        status: true,
        msg: ' Esta ruta creara a los usuarios'
    })
};

//Controlador de la ruta de login
const loginUsuario = (req = request, resp = response) => {

    const { email, password } = req.body;
    console.log(email, password);

    return resp.json({
        status: true,
        msg: ' Esta ruta logeara a los usuarios'
    })
}

//Controlador de la ruta de validar token
const revalidarToken = (req = request, resp = response) => {
    return response.json({
        status: true,
        msg: ' Esta ruta validará los JWT'
    })
}


//Exportacion de los controllers
module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}