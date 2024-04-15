const express = require("express");
const router = express.Router();
const LocationController = require("../controllers/Location-Controller");

router.get("/", LocationController.getAllLocation);
router.get("/:id", LocationController.getLocationById);
router.post("/", LocationController.addLocation);
router.put("/:id", LocationController.editLocation);
router.patch("/:id", LocationController.deleteLocation);

module.exports = router;