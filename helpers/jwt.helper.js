const jwt = require('jsonwebtoken');

const generarJWT = (uid, name) => {
    //Construyo la info que tendrá mi token
    const payload = { uid, name }

    //Creo el jwt
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '12h',
        }, (error, token) => {
            if (error) {
                reject(error);
            } else {
                resolve(token);
            }
        });
    });
}


module.exports = {
    generarJWT
}