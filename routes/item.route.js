const router = require("express").Router();
const mongoose = require("mongoose");
const {
  createItem,
  findAllItems,
  findItemById,
  updateItem,
  deleteItemById,
} = require("../controllers/item.controller");

const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(204).send();
  } else {
    next();
  }
};

router.get("/", async (req, res) => {
  const items = await findAllItems();
  res.json(items);
});

router.post("/", async (req, res) => {
  try {
    const item = await createItem(req.body);
    res.status(201).json(item);
  } catch (e) {
    console.log(e);
    res.status(e?.status ?? 500).json(e);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedItem = await updateItem(req.params.id, req.body);
    res.status(200).json(updatedItem);
  } catch (e) {
    console.log(e);
    res.status(e?.status ?? 500).json(e);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await deleteItemById(req.params.id);
    res.send();
  } catch (err) {
    res.status(err?.status ?? 500).json(err);
  }
});

module.exports = router;

// {
//     city: "New York",
//     name: "Monitor",
//     sku: 123,
//     volume: 5,
//     volumeUnits: "cubic feet",
//     price: 119.99,
//     currency: "USD",
//     imageUrl:
//       "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/HMUA2_AV1?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1563859125527",
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//     status: "Storage",
//     id: "6",
//   },
