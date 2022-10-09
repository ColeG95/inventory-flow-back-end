const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  city: String,
  name: {
    type: String,
    required: true,
    validate: {
      validator: (v) => v.length > 1,
      message: (props) => `${props.value} needs to have more than 1 character`,
    },
  },
  status: String,
  sku: {
    type: String,
    // default: () => {
    //   if (this.name === "Monitor") {
    //     return "123";
    //   } else if (this.name === "Chair") {
    //     return "124";
    //   } else if (this.name === "Desk") {
    //     return "125";
    //   } else {
    //     return "";
    //   }
    // },
  },
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
  return this._id.toHexString();
});

itemSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("Item", itemSchema);
