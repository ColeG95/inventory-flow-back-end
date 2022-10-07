const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const Warehouse = require("./models/Warehouse.model");

const app = express();
app.use(cors());
app.use(express.json());

const inventoryRouter = require("./routes/inventory.route.js");
app.use("/inventory", inventoryRouter);

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongo connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

connectToMongo();

// async function run() {
//     const warehouse = new Warehouse({city: "Pittsburg"})
//     await warehouse.save()
//     console.log(warehouse)
// }

async function saveOrUpdate() {
  // does same thing as above

  // only use create and save because those go through your validation
  try {
    const warehouse = await Warehouse.create({
      city: "Pittsburg",
      stateCode: "IL",
      volumeCapacity: 2222222,
      volumeUnits: "cubic feet",
      inventory: [{ name: "testing" }, { name: "testing2" }],
    });
    console.log(warehouse);
  } catch (e) {
    console.log(e.message);
  }

  // update
  //   warehouse.city = "Detroit";
  //   await warehouse.save();
}
saveOrUpdate();

async function findWarehouse() {
  try {
    const warehouse = await Warehouse.findById("634066bb0d84e8cf334ef4ea");
  } catch (e) {
    console.log(e.message);
  }
}

// app.get("/", (req, res) => {
//   res.send("welcome to home page");
// });

// middleware
function logger(req, res, next) {
  console.log(`Request recieved from ${req.originalUrl}`);
  next();
}

app.get("/", logger, (req, res) => {
  res.send("Hello");
});

app.post("/test", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

app.get("*", (req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Listening on port ${process.env.PORT || 8080}`);
});
