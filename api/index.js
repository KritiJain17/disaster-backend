const express = require("express");
const router = express.Router();

const disasterRoutes = require("./routes/disasterRoutes");
const userRoutes = require("./routes/userRoutes");
const socialRoutes = require("./routes/socialRoutes");
const resourceRoutes = require("./routes/resourceRoutes");

router.use("/disasters", disasterRoutes);
router.use("/users", userRoutes);
router.use("/disasters", socialRoutes);
router.use("/resources", resourceRoutes);

module.exports = router;
