
const { Schema, model } = require("mongoose");

const recuperacionSchema = Schema({
  user: {
    type: String,
    required: true,
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
  object.uid = _id;
  return object;
});

module.exports = model("Recuperacion", recuperacionSchema);
