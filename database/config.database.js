const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('Base de datos conectada');

    } catch (error) {
        console.log(error);
        throw new Error('No se puede realizar la conexión a la base de datos');
    }
}

module.exports = {
    dbConnection
}