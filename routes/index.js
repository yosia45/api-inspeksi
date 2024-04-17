"use strict";

const express = require("express");
const router = express.Router();
const errorHandler = require("../middlewares/errorHandler");
const questionCategoryRoute = require("./questionCategory-route");
const questionRoute = require("./question-route");
const locationRoute = require("./location-route");
const userRoute = require("./user-route");
const mineInspectionRoute = require("./mineInspection-route");

router.use("/categories", questionCategoryRoute);
router.use("/questions", questionRoute);
router.use("/locations", locationRoute);
router.use("/users", userRoute);
router.use("/inspections", mineInspectionRoute);
router.use(errorHandler);

module.exports = router;
