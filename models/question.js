"use strict";
const ERROR_TYPE = require("../helpers/constant");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      question.belongsTo(models.question_category, {
        foreignKey: "question_category_id",
      });
      question.hasMany(models.answer, { foreignKey: "question_id" });
      question.hasMany(models.log, { foreignKey: "question_id" });
    }
  }
  question.init(
    {
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Question is required`,
          },
          notEmpty: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Question is required`,
          },
        },
      },
      question_category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Question CategoryID is required`,
          },
          notEmpty: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Question CategoryID is required`,
          },
          isInt: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Question CategoryID must integer`,
          },
        },
      },
      createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} createdBy is required`,
          },
          notEmpty: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} createdBy is required`,
          },
        },
      },
      modifiedBy: DataTypes.STRING,
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
      modelName: "question",
    }
  );
  question.beforeCreate((instance, options) => {
    instance.isDeleted = 0;
  });
  return question;
};
