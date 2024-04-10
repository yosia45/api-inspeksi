"use strict";

const ERROR_TYPE = require("../helpers/constant");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      log.belongsTo(models.question_category_id, {
        foreignKey: "question_category_id",
      });
      log.belongsTo(models.question, { foreignKey: "question_id" });
      log.belongsTo(models.answer, { foreignKey: "answer_id" });
      log.belongsTo(models.mine_inspection, { foreignKey: "mine_inspection_id" });
      log.belongsTo(models.inspection_file, { foreignKey: "inspection_file_id" });
      log.belongsTo(models.inspection_inspector, {
        foreignKey: "inspection_inspector_id",
      });
    }
  }
  log.init(
    {
      eventName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} eventName is required`,
          },
          notNull: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} eventName is required`,
          },
        },
      },
      value: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} value is required`,
          },
          notNull: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} value is required`,
          },
        },
      },
      createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      question_category_id: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Question Category ID must integer`,
          },
        },
      },
      question_id: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Question ID must integer`,
          },
        },
      },
      answer_id: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Answer ID must integer`,
          },
        },
      },
      mine_inspection_id: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Mine Inspection ID must integer`,
          },
        },
      },
      inspection_file_id: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Inspection File ID must integer`,
          },
        },
      },
      inspection_inspector_id: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Inspection_Inspector ID must integer`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "log",
    }
  );
  return log;
};
