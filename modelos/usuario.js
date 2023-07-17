// En vez de importar asi const mongoose = require('mongoose'); 
// usamos desestructuracion
const { Schema, model } = require('mongoose');
// La definicion de los registros de una coleccion de usuarios
// equivalente a una tabla de usuarios en mysql con sus campos
const UsuarioSchema = Schema({
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
    code: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    countryisoCode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: '/profile.png'
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    },
    status: {
        type: Number,
        default: 1 // 1 = activo, 0 = inactivo, 2 = bloqueado
    }
});
UsuarioSchema.method('toJSON', function () {
    const { __v, _id, password, ...object } = this.toObject();
    object.id = _id;
    return object;
})
module.exports = model('Usuario', UsuarioSchema);