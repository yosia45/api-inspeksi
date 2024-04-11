const errorHandler = (err, req, res, next) => {
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    res.status(400).json({ message: err.errors[0].message });
  } else if (err.name === "CategoryNotFound") {
    res.status(404).json({ message: "Category not found" });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = errorHandler;
