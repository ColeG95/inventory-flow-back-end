const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSummarySchema = new Schema({
  city: String,
  name: String,
  sku: String,
  volume: Number,
  volumeUnits: String,
  price: Number,
  currency: String,
  imageUrl: String,
  quantity: Number,
});

const warehouseSchema = new Schema({
  city: { type: String, required: true },
  stateCode: String,
  volumeCapacity: Number,
  volumeUnits: String,
  manager: String,
  phone: { type: String, default: "8002223333" },
  inventory: [itemSummarySchema],
  referenceToAnotherMongoObject: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Warehouse",
  },
});

warehouseSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

warehouseSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

// warehouseSchema.methods.sayHi = function() {
//     console.log(`Hi my name is ${this.name}`)
// }

// warehouseSchema.statics.findByCity = function(city) {
//     return this.find({city: new RegExp(city, "i")})
// }

// warehouseSchema.query.byCity = function(city) {
//     return this.where({city: new RegExp(city, "i")})
// }

// warehouseSchema.virtual("volumeLeft").get(function() {
//     return this.volumeCapacity - this.somethingElse
// })

// middleware. Do something before a specified action. i.e. assign value before save() is called.
// warehouseSchema.pre("save", function(next) {
//     this.updatedAt = Date.now()
//     next()
// })

module.exports = mongoose.model("Warehouse", warehouseSchema);

// DUMMY_WAREHOUSES = [
//     {
//       city: "New York",
//       stateCode: "NY",
//       volumeCapacity: 1000000,
//       volumeUnits: "cubic feet",
//       manager: "Phillip Yager",
//       phone: "8056543321",
//       id: 1,
//       inventory: [
//         {
//           city: "New York",
//           name: "Monitor",
//           sku: 123,
//           volume: 5,
//           volumeUnits: "cubic feet",
//           price: 119.99,
//           currency: "USD",
//           imageUrl:
//             "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/HMUA2_AV1?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1563859125527",
//           quantity: 243,
//         },
