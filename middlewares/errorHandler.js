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
  } else if (err.name === "NameOfCategoryIsRequired") {
    res.status(400).json({
      message: `${ERROR_TYPE.ERROR_TYPE.server} Name of Category is required`,
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
    res
      .status(400)
      .json({
        message: `${ERROR_TYPE.ERROR_TYPE.server} Category of Question is required`,
      });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = errorHandler;
