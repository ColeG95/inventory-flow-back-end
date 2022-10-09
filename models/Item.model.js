const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  city: String,
  name: {
    type: String,
    validate: {
      validator: (v) => v.length > 1,
      message: (props) => `${props.value} needs to have more than 1 character`,
    },
  },
  status: String,
  sku: String,
  volume: Number,
  volumeUnits: String,
  price: { type: Number, min: [0, "Price must be greater than 0"] },
  currency: String,
  imageUrl: String,
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

itemSchema.virtual("id").get(function () {
  return this._id;
});

module.exports = mongoose.model("Item", itemSchema);
