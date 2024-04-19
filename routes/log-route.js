const express = require("express");
const router = express.Router();
const LogController = require("../controllers/Log-Controller");

router.get("/", LogController.getAllHistories);

module.exports = router;