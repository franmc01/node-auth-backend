const { request, response } = require('express');
const Usuario = require('../models/Usuario.model');
const bcrypt = require('bcryptjs');


//Controlador de la ruta de register
const crearUsuario = async (req = request, resp = response) => {
    //Recepcion de los campos
    const { name, email, password } = req.body;

    try {

        //Verificar el email en la base de datos
        const usuario = await Usuario.findOne({ email });

        if(usuario) {
            return resp.status(400).json({
                ok:false,
                msg: 'El email ingresado ya existe en la BD, intente con otro'
            });
        }

        //Crear usuario haciendo uso del userSchema
        const dbusuario = new Usuario( { email, name, password });

        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        dbusuario.password = bcrypt.hashSync(password, salt);

        //Generar el JWT


        //Guardar el usuario en la base de datos
        await dbusuario.save();

        //Generar la respuesta exitosa
        return resp.status(201).json({
            ok:true,
            uid: dbusuario.id,
            name,
            token: "Aqui va el token"
        });

    } catch (error) {
        return resp.status(500).json({
            ok: true,
            msg: 'Error en servidor, contacte al administrador'
        })
    }
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