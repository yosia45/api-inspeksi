const express = require("express");
const router = express.Router();
const MineInspectionController = require("../controllers/MineInspection-Controller");

router.get("/", MineInspectionController.getAllMineInspection);
router.get("/:id", MineInspectionController.getMineInspectionById);
router.post("/", MineInspectionController.addMineInspections);
router.put("/:id", MineInspectionController.editMineInspection);
router.patch("/:id", MineInspectionController.deleteMineInspection);

module.exports = router;
