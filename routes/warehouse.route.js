const router = require("express").Router();
const {
  findAllWarehouses,
  findWarehouseById,
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

module.exports = router;
