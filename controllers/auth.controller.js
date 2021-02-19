const { request, response } = require('express');
const { validationResult } = require('express-validator');


const crearUsuario = (request, response) => {

    const errors = validationResult(request);
    if(!errors.isEmpty()){ 
        return response.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    const { names, email, password } = request.body;
    console.log(names, email, password);

    return response.json({
        status: true,
        msg: ' Esta ruta creara a los usuarios'
    })
};

const loginUsuario = (request, response) => {

    const errors = validationResult(request);
    if(!errors.isEmpty()){ 
        return response.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    const { email, password } = request.body;
    console.log(email, password);

    return response.json({
        status: true,
        msg: ' Esta ruta logeara a los usuarios'
    })
}

const revalidarToken = (request, response) => {
    return response.json({
        status: true,
        msg: ' Esta ruta validará los JWT'
    })
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}