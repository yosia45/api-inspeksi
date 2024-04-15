"use strict";
const ERROR_TYPE = require("../helpers/constant");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      location.hasMany(models.mine_inspection, { foreignKey: "lokasi_id" });
    }
  }
  location.init(
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
      modelName: "location",
    }
  );
  location.beforeCreate((instance, options) => {
    instance.isDeleted = 0;
  });
  return location;
};
