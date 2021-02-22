const { request, response } = require('express');
const Usuario = require('../models/Usuario.model');
const bcrypt = require('bcryptjs');
const cloudinary = require('cloudinary').v2
cloudinary.config({ 
    cloud_name: 'cloudfrancisco',
    api_key: '194556868641438',
    api_secret: 'yK5OygE_p6-RMwLn5QYy0FJD5Uc'
})
const { generarJWT } = require('../helpers/jwt.helper');


//Controlador de la ruta de register
const crearUsuario = async (req = request, resp = response) => {

    //Recepcion de los campos
    const img = req.file;
    const { name, email, password } = req.body;

    try {

        //Verificar el email en la base de datos
        const usuario = await Usuario.findOne({ email });

        const { secure_url } = await cloudinary.uploader.upload(img.path)

        if (usuario) {
            return resp.status(400).json({
                ok: false,
                msg: 'El email ingresado ya existe en la BD, intente con otro'
            });
        }

        //Crear usuario haciendo uso del userSchema
        const dbUsuario = new Usuario({ email, name, password, avatar: secure_url });

        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        dbUsuario.password = bcrypt.hashSync(password, salt);

        //Generar el JWT
        const token = await generarJWT(dbUsuario.id, name);

        //Guardar el usuario en la base de datos
        await dbUsuario.save();

        //Generar la respuesta exitosa
        return resp.status(201).json({
            ok: true,
            uid: dbUsuario.id,
            name,
            avatar: dbUsuario.avatar,
            _token: token
        });

    } catch (error) {
        console.log(error);

        return resp.status(500).json({
            ok: false,
            msg: 'Error en servidor, contacte al administrador'
        });
    }
};

//Controlador de la ruta de login
const loginUsuario = async (req, resp = response) => {

    //Recepcion de los campos
    const { email, password } = req.body;

    try {

        //Verificar si existe el usuario en la BD
        const dbUsuario = await Usuario.findOne({ email });

        //Si no existe, rechazar la petición
        if (!dbUsuario) {
            return resp.status(400).json({
                ok: false,
                msg: 'El usuario no existe en nuestra BD'
            });
        }

        //Si existe, validar las credenciales ingresadas
        const validPassword = bcrypt.compareSync(password, dbUsuario.password);

        //Si las credenciales son incorrectas, rechazar la petición
        if (!validPassword) {
            return resp.status(400).json({
                ok: false,
                msg: 'Credenciales de usuario incorrectas'
            });
        }

        //Si todo esta ok, generar JWT y dar acceso
        const token = await generarJWT(dbUsuario.id, dbUsuario.name);
        return resp.json({
            ok: true,
            msg: 'Acceso correcto',
            uid: dbUsuario.id,
            name: dbUsuario.name,
            avatar: dbUsuario.avatar,
            _token: token
        })

    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error en servidor, contacte al administrador'
        })
    }
}

//Controlador de la ruta de validar token cada vez que se requiera
const revalidarToken = async (req = request, resp = response) => {

    //Recibo la información que me envia el middleware
    const { uid, name } = req;

    // Generar un nuevo JWT
    const token = await generarJWT( uid, name );

    return resp.json({
        ok: true,
        uid, 
        name: name,
        _token: token
    });
}


//Exportacion de los controllers
module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}