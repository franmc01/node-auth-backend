//Importacion de express
const express = require('express');
const router = require('./routes/auth.routes');

//Creación del servidor/aplicación de express
const app = express();


//Configuración de las rutas
app.get('/', (req, res) => {
 return res.json({
    status: true,
    msg: "Bienvenido al Auth Backend de Noveno Semestre"
 });
});
app.use('/api/auth', router);



//Levantar el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});