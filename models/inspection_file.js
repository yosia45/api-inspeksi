"use strict";
const ERROR_TYPE = require("../helpers/constant");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class inspection_file extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      inspection_file.belongsTo(models.mine_inspection, {
        foreignKey: "mine_inspection_id",
      });
      inspection_file.hasMany(models.log, { foreignKey: "inspection_file_id" });
    }
  }
  inspection_file.init(
    {
      file_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} File Name is required`,
          },
          notNull: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} File Name is required`,
          },
        },
      },
      mine_inspection_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Mine Inspection ID is required`,
          },
          notNull: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Mine Inspection ID is required`,
          },
          isInt: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Mine Inspection ID must integer`,
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
      modifiedBy: DataTypes.STRING,
      isDeleted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Mine Inspection ID must integer`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "inspection_file",
    }
  );
  return inspection_file;
};
