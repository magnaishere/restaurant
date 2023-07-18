
const { Schema, model, ObjectId } = require("mongoose");

const recuperacionSchema = Schema({
  user: {
    type: ObjectId,
    ref: 'Usuario'
  },
  expire_at: {
    type: Date,
    default: () => Date.now() + 30*60000
  },
  claimed: {
    type: Boolean,
    default: false
  },
  code:  {
    type: String,
    required: true,
  },
  recoverykey: {
    type: String
  },
  consumed: {
    type: Boolean,
    default: false
  }
});

recuperacionSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Recuperacion", recuperacionSchema);
