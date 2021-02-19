//Importacion de express
const express = require('express');
const router = require('./routes/auth.routes');
const cors = require('cors');
require('dotenv').config()

//Creación del servidor/aplicación de express
const app = express();

//Configuracion de CORS
app.use(cors());

//Configuracion del bodyParser
app.use(express.json());

//Configuración de las rutas
app.get('/', (req, res) => {

    return res.json({
        status: true,
        msg: "Bienvenido al Auth Backend de Noveno Semestre"
    });

});

app.use('/api/auth', router);

//Levantar el servidor
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});