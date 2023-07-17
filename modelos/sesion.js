
const { Schema, model } = require("mongoose");

const sesionSchema = Schema({
  user: {
    type: String,
    required: true,
  },
  connected_at: {
    type: Date,
    default: () => Date.now()
  },
  closed: {
    type: Boolean,
    default: false
  },
  token: {
    type: String,
    required: true
  }
});

sesionSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model("Sesion", sesionSchema);
