"use strict";
const ERROR_TYPE = require("../helpers/constant");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      answer.belongsTo(models.mine_inspection, {
        foreignKey: "mine_inspection_id",
      });
      answer.belongsTo(models.question, { foreignKey: "question_id" });
      answer.hasMany(models.log, { foreignKey: "answer_id" });
    }
  }
  answer.init(
    {
      mine_inspection_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Mine Inspection is required`,
          },
          notNull: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Mine Inspection is required`,
          },
          isInt: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Mine Inspection must integer`,
          },
        },
      },
      question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Question ID is required`,
          },
          notNull: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Question ID is required`,
          },
          isInt: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Question ID must integer`,
          },
        },
      },
      choices: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} answer is required`,
          },
          notEmpty: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} answer is required`,
          },
        },
      },
      addition_information: DataTypes.TEXT,
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
      modifiedBy: DataTypes.STRING,
      isDeleted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} isDeleted must integer`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "answer",
    }
  );
  answer.beforeCreate((instance, options) => {
    instance.isDeleted = 0;
  });
  return answer;
};
