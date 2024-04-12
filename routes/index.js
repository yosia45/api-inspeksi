const express = require("express");
const router = express.Router();
const errorHandler = require("../middlewares/errorHandler");
const questionCategoryRoute = require("./questionCategory-route");
const questionRoute = require("./question-route");

router.use("/categories", questionCategoryRoute);
router.use("/questions", questionRoute);
router.use(errorHandler);

module.exports = router;
