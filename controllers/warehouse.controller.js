const Warehouse = require("../models/Warehouse.model");

async function findAllWarehouses() {
  const warehouses = await Warehouse.find();
  return warehouses;
}

async function findWarehouseById(id) {
  try {
    const warehouse = await Warehouse.findById(id);
    if (warehouse === null) {
      throw { status: 204, msg: `Warehouse with id ${id} not found` };
    }
    return warehouse;
  } catch (e) {
    throw e;
  }
}

async function createWarehouse(warehouseToSave) {
  try {
    const warehouse = await Warehouse.create(warehouseToSave);
    return warehouse;
  } catch (e) {
    throw e;
  }
}

async function updateWarehouseInventory(city, qtyToBeSummed, name) {
  try {
    const warehouse = await Warehouse.findOne({ city: city });
    for (let item of warehouse.inventory) {
      if (item.name === name) {
        item.quantity += qtyToBeSummed;
      }
    }
    warehouse.save();
    return warehouse;
  } catch (e) {
    throw e;
  }
}

module.exports = {
  findAllWarehouses,
  findWarehouseById,
  createWarehouse,
  updateWarehouseInventory,
};

// Warehouse.where("city").equals("New York")

// find by field. Warehouse.find({ city: "New York" }) if finds nothing => []

//   Warehouse.where("volumeCapacity").gt(1000000)  **gt = Greater than

//   .select("field") only gets this field

//   warehouses.referenceToAnotherMongoObject = "Id goes here" This adds a reference to another warehouse

//  .populate("referenceToAnotherMongoObject") Gets all the data for the referenced object
