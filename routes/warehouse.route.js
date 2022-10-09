const router = require("express").Router();
const {
  findAllWarehouses,
  findWarehouseById,
  createWarehouse,
  updateWarehouseInventory,
} = require("../controllers/warehouse.controller");

router.get("/:id", async (req, res) => {
  try {
    const warehouse = await findWarehouseById(req.params.id);
    res.json(warehouse);
  } catch (e) {
    res.status(e.status).json(e);
  }
});

router.get("/", async (req, res) => {
  const warehouses = await findAllWarehouses();
  res.json(warehouses);
});

router.post("/", async (req, res) => {
  try {
    const warehouse = await createWarehouse(req.body);
    res.status(201).json(warehouse);
  } catch (e) {
    console.log(e);
    res.status(e?.status ?? 500).json(e);
  }
});

router.patch("/:city", async (req, res) => {
  const city = req.params.city;
  const qtyToBeSummed = req.body.qtyToBeSummed;
  const name = req.body.name;
  try {
    const warehouse = await updateWarehouseInventory(city, qtyToBeSummed, name);
    res.status(201).json(warehouse);
  } catch (e) {
    console.log(e);
    res.status(e?.status ?? 500).json(e);
  }
});

module.exports = router;
