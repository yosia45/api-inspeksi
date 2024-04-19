"use strict";
const ERROR_TYPE = require("../helpers/constant");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class inspection_inspector extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      inspection_inspector.belongsTo(models.mine_inspection, {
        foreignKey: "mine_inspection_id",
      });
      inspection_inspector.hasMany(models.log, {
        foreignKey: "inspection_inspector_id",
      });
    }
  }
  inspection_inspector.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Inspector Name is required`,
          },
          notEmpty: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Inspector Name is required`,
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
          notNull: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Inspector Name is required`,
          },
          notEmpty: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Inspector Name is required`,
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
      modelName: "inspection_inspector",
    }
  );
  inspection_inspector.beforeCreate((instance, options) => {
    instance.isDeleted = 0;
  });
  return inspection_inspector;
};
