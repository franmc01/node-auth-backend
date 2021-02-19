const { request, response } = require('express');


const crearUsuario = (request, response) => {
    return response.json({
        status: true,
        msg: ' Esta ruta creara a los usuarios'
    })
};

const loginUsuario = (request, response) => {
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