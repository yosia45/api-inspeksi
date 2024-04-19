"use strict";

const express = require("express");
const router = express.Router();
const errorHandler = require("../middlewares/errorHandler");
const questionCategoryRoute = require("./questionCategory-route");
const questionRoute = require("./question-route");
const locationRoute = require("./location-route");
const userRoute = require("./user-route");
const mineInspectionRoute = require("./mineInspection-route");
const inspectionFileRoute = require("./inspectionFile-route");
const answerRoute = require("./answer-route");
const inspectorRoute = require("./inspector-route");
const logRoute = require("./log-route");

router.use("/categories", questionCategoryRoute);
router.use("/questions", questionRoute);
router.use("/locations", locationRoute);
router.use("/users", userRoute);
router.use("/inspections", mineInspectionRoute);
router.use("/inspectionfiles", inspectionFileRoute);
router.use("/answers", answerRoute);
router.use("/inspectors", inspectorRoute);
router.use("/logs", logRoute);
router.use(errorHandler);

module.exports = router;
