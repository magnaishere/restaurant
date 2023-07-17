
const { Schema, model, ObjectId } = require("mongoose");

const SocketSesionSchema = Schema({
  socket: {
    type: String,
    required: true,
  },
  user: {
    type: ObjectId,
    ref: 'Usuario'
  },
  lastConnect: { type: Date, default: Date.now },
  loguedOutAt: { type: Date }
});

SocketSesionSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model("SocketSesion", SocketSesionSchema); 
