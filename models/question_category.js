"use strict";
const ERROR_TYPE = require("../helpers/constant");
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
      question_category.hasMany(models.question, {
        foreignKey: "question_category_id",
      });
      question_category.hasMany(models.log, {
        foreignKey: "question_category_id",
      });
    }
  }
  question_category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Name is required`,
          },
          notNull: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Name is required`,
          },
        },
      },
      createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} createdBy is required`,
          },
          notNull: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} createdBy is required`,
          },
        },
      },
      modifiedBy: {
        type: DataTypes.STRING,
      },
      isDeleted: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} isDeleted must integer`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "question_category",
    }
  );
  question_category.beforeCreate((instance, options) => {
    instance.isDeleted = 0;
  });
  return question_category;
};
