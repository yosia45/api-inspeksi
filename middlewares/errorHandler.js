"use strict";
const ERROR_TYPE = require("../helpers/constant");

const errorHandler = (err, req, res, next) => {
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    res.status(400).json({ message: err.errors[0].message });
  } else if (err.name === "CategoryNotFound") {
    res
      .status(404)
      .json({ message: `${ERROR_TYPE.ERROR_TYPE.server} Category not found` });
  } else if (err.name === "CategoryNameIsRequired") {
    res.status(400).json({
      message: `${ERROR_TYPE.ERROR_TYPE.server} Category name is required`,
    });
  } else if (err.name === "QuestionNotFound") {
    res
      .status(404)
      .json({ message: `${ERROR_TYPE.ERROR_TYPE.server} Question not found` });
  } else if (err.name === "QuestionIsRequired") {
    res.status(400).json({
      message: `${ERROR_TYPE.ERROR_TYPE.server} Question is required`,
    });
  } else if (err.name === "QuestionCategoryIsRequired") {
    res.status(400).json({
      message: `${ERROR_TYPE.ERROR_TYPE.server} Question Category is required`,
    });
  } else if (err.name === "LocationNotFound") {
    res
      .status(404)
      .json({ message: `${ERROR_TYPE.ERROR_TYPE.server} Location not found` });
  } else if (err.name === "LocationNameIsRequired") {
    res.status(400).json({
      message: `${ERROR_TYPE.ERROR_TYPE.server} Location name is required`,
    });
  } else if (err.name === "UserNotFound") {
    res
      .status(404)
      .json({ message: `${ERROR_TYPE.ERROR_TYPE.server} User not found` });
  } else if (err.name === "UserNameIsRequired") {
    res.status(400).json({
      message: `${ERROR_TYPE.ERROR_TYPE.server} User name is required`,
    });
  } else if (err.name === "NopegIsRequired") {
    res.status(400).json({
      message: `${ERROR_TYPE.ERROR_TYPE.server} Nopeg is required`,
    });
  } else if (err.name === "MineInspectionNotFound") {
    res.status(404).json({
      message: `${ERROR_TYPE.ERROR_TYPE.server} Mine Inspection not found`,
    });
  } else if (err.name === "LokasiIdIsRequired") {
    res.status(400).json({
      message: `${ERROR_TYPE.ERROR_TYPE.server} Lokasi_Id is required`,
    });
  } else if (err.name === "GroupIsRequired") {
    res.status(400).json({
      message: `${ERROR_TYPE.ERROR_TYPE.server} Group is required`,
    });
  } else if (err.name === "ShiftIsRequired") {
    res.status(400).json({
      message: `${ERROR_TYPE.ERROR_TYPE.server} Shift is required`,
    });
  } else if (err.name === "TimeIsRequired") {
    res.status(400).json({
      message: `${ERROR_TYPE.ERROR_TYPE.server} Time is required`,
    });
  } else if (err.name === "DateIsRequired") {
    res.status(400).json({
      message: `${ERROR_TYPE.ERROR_TYPE.server} Date is required`,
    });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = errorHandler;
