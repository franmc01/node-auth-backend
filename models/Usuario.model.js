const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://www.wallchase.com/assets/img/no-pic.jpg'
    }
});


module.exports = model('users', userSchema);