const { response } = require('express');
const jwt = require('jsonwebtoken');


const validarJWT = ( req, res = response, next ) => {

    //Obtengo el token del header
    const token = req.header('x-token');

    //Compruebo si recibo el token
    if( !token  ) {
        return res.status(401).json({
            ok: false,
            msg: 'Error, debe enviar en el token'
        });
    }

    try {

        //Verifico si el token que me llegó es válido
        const { uid, name } = jwt.verify( token, process.env.SECRET_JWT_SEED );
        req.uid  = uid;
        req.name = name;

        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Acceso denegado, token invalido'
        });
    }
    
    next();
}


module.exports = {
    validarJWT
}