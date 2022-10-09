const Item = require("../models/Item.model");

async function findAllItems() {
  const items = await Item.find();
  return items;
}

async function findItemById(id) {
  try {
    const item = await Item.findById(id);
    if (item === null) {
      throw { status: 204, msg: `Warehouse with id ${id} not found` };
    }
    return item;
  } catch (e) {
    throw e;
  }
}

async function createItem(itemToSave) {
  try {
    const item = await Item.create(itemToSave);
    return item;
  } catch (e) {
    throw e;
  }
}

async function updateItem(id, updatedItem) {
  try {
    let item = await Item.findByIdAndUpdate(id, {
      ...updatedItem,
      updatedAt: Date.now(),
    });
    return item;
  } catch (e) {
    throw e;
  }
}

async function deleteItemById(id) {
  try {
    await Item.findByIdAndDelete(id);
  } catch (e) {
    throw e;
  }
}

module.exports = {
  findAllItems,
  findItemById,
  createItem,
  updateItem,
  deleteItemById,
};
