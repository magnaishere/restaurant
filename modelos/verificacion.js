// En vez de importar asi const mongoose = require('mongoose'); 
// usamos desestructuracion
const { Schema, model, ObjectId } = require('mongoose');

// La definicion de los registros de una coleccion de usuarios
// equivalente a una tabla de usuarios en mysql con sus campos
const VerificacionSchema = Schema({
    user: {
        type: ObjectId,
        ref: 'Usuario'
    },
    code: {
        type: String,
        required: true
    },
    created_at: { type: Date, default: Date.now },
    expire_at: {
        type: Date,
        default: () => Date.now() + 30*60000
    },
    completed: {
      type: Boolean,
      default: false,
    },
});
VerificacionSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})
module.exports = model('Verficacion', VerificacionSchema);