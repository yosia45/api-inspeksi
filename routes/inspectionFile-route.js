const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const InspectionFileController = require("../controllers/InspectionFile-Controller");

router.post(
  "/",
  upload.array("files",5),
  InspectionFileController.createInspectionFile
);

module.exports = router;
