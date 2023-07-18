
const { Schema, model, ObjectId } = require("mongoose");

const tiendaSchema = Schema({
  admin: {
    type: ObjectId,
    ref: 'Usuario'
  },
  description: {
    type: String,
    default: ''
  },
  mods: [
    {
      type: ObjectId,
      ref: 'Usuario'
    }
  ],
  socials: [
    {
      url: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: ''
      }
    }
  ],
  banner: {
    type: String,
    default: ''
  },
  logo: {
    type: String,
    default: ''
  },
});

tiendaSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Tienda", tiendaSchema);
