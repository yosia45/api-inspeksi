const express = require("express");
const router = express.Router();
const InspectorController = require("../controllers/InspectionInspector-Controller");

router.get("/", InspectorController.getAllInspector);
router.get("/:id", InspectorController.getInspectorById);
router.post("/", InspectorController.addInspector);
router.put("/:id", InspectorController.editInspector);
router.patch("/:id", InspectorController.deleteInspector);

module.exports = router;
