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
  // referenceToAnotherMongoObject: mongoose.SchemaTypes.ObjectId,
});

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
