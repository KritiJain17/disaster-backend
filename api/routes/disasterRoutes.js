const express = require("express");
const router = express.Router();

const controller = require("../controllers/disasterControllers");
const resourceController = require("../controllers/resourceControllers");
const officialUpdateController = require("../controllers/officialUpdateControllers");

router.post("/", controller.createDisaster);
router.get("/", controller.getDisaster);
router.put("/:id", controller.editDisaster);
router.delete("/:id", controller.deleteDisaster);

router.get("/:id/resources", resourceController.getNearbyResources);
router.get("/:id/resource", resourceController.getNearbyResourcesViaDisasterId);
router.get(
  "/:id/official-updates",
  officialUpdateController.getOfficialUpdates
);

module.exports = router;
