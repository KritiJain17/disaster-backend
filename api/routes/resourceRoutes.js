const express = require("express");
const router = express.Router();
const controller = require("../controllers/resourceControllers");

router.post("/", controller.addResource);

module.exports = router;
