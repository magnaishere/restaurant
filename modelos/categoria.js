// En vez de importar asi const mongoose = require('mongoose');
// usamos desestructuracion
const { Schema, model, ObjectId } = require("mongoose");

// La definicion de los registros de una coleccion de usuarios
// equivalente a una tabla de usuarios en mysql con sus campos
const CategoriaSchema = Schema({
  store: {
    type: ObjectId,
    ref: 'Tienda',
    required: true
  },
  title: {
    type: String,
    required: true,
  }
});

CategoriaSchema.method("toJSON", async function () {
  let { __v, _id, store, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Categoria", CategoriaSchema);