"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class question_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      question_category.hasMany(models.question, {foreignKey: 'question_category_id'})
      question_category.hasMany(models.log,{foreignKey:'question_category_id'})
    }
  }
  question_category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Database Violation: Name is required" },
          notNull: { msg: "Database Violation: Name is required" },
        },
      },
      createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Database Violation: createdBy is required" },
          notNull: { msg: "Database Violation: createdBy is required" },
        },
      },
      modifiedBy: {
        type: DataTypes.STRING,
      },
      isDeleted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Database Violation: isDeleted is required" },
          notNull: { msg: "Database Violation: isDeleted is required" },
          isInt: { msg: "Database Violation: isDeleted must integer" },
        },
      },
    },
    {
      sequelize,
      modelName: "question_category",
    }
  );
  return question_category;
};
