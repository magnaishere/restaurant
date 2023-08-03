
const { Schema, model, ObjectId } = require("mongoose");
const Categoria = require("./categoria")
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
  active: {
    type: Boolean,
    default: true
  },
});

tiendaSchema.method("toJSON", async function () {
  const { __v, _id, admin, active, ...object } = this.toObject();
  object.id = _id;
  const categoriasDB = await Categoria.find({ store: _id });
  let cats0 = [];
  for (const cat of categoriasDB) {
    cats0.unshift({ id: cat._id, title: cat.title });
  }
  object.categories = cats0;
  return object;
});

module.exports = model("Tienda", tiendaSchema);
