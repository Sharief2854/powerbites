

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connected = require("./config/connectDB");
// const connected = require("./config/connectDB");
const app = express();

const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors());
app.use(express.json());
connected();
const ProductRouter = require("./Routes/Auth/ProductRouter/ProductRouter"); 

app.use("/product", ProductRouter);
app.get("/home", (req, res) => {
  res.send("server working");
});

console.log("hii");

app.listen(process.env.PORT, () => {
  console.log("server is running on port 5000");
});
