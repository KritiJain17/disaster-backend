const express = require("express");
const apiRoutes = require("./api");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", apiRoutes);

module.exports = app;
