// Make all queries here
const Warehouse = require("../models/Warehouse.model");

async function findAllWarehouses() {
  const warehouses = await Warehouse.find();
  return warehouses;
}

async function findWarehouseById(id) {
  try {
    const warehouse = await Warehouse.findById(id);
    console.log(warehouse);
    console.log(warehouse === null);
    if (warehouse === null) {
      throw { status: 204, msg: `Warehouse with id ${id} not found` };
    }
    return warehouse;
  } catch (e) {
    throw e;
  }
}

module.exports = { findAllWarehouses, findWarehouseById };
