const express = require("express");
const controller = require("../controllers/socialControllers");
const router = express.Router();

router.get("/:id/social-media", controller.getSocialMedia);

module.exports = router;
