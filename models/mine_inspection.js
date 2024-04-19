"use strict";
const ERROR_TYPE = require("../helpers/constant");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class mine_inspection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      mine_inspection.hasMany(models.answer, {
        foreignKey: "mine_inspection_id",
      });
      mine_inspection.hasMany(models.inspection_file, {
        foreignKey: "mine_inspection_id",
      });
      mine_inspection.hasMany(models.inspection_inspector, {
        foreignKey: "mine_inspection_id",
      });
      mine_inspection.hasMany(models.log, { foreignKey: "mine_inspection_id" });
      mine_inspection.belongsTo(models.location, { foreignKey: "lokasi_id" });
      mine_inspection.belongsTo(models.user, { foreignKey: "nopeg" });
    }
  }
  mine_inspection.init(
    {
      nopeg: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Nomor Pegawai is required`,
          },
          notNull: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Nomor Pegawai is required`,
          },
        },
      },
      lokasi_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Lokasi ID is required`,
          },
          notNull: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Lokasi ID is required`,
          },
          isInt: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Lokasi ID must integer`,
          },
        },
      },
      group: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Group is required`,
          },
          notNull: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Group is required`,
          },
        },
      },
      shift: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Shift is required`,
          },
          notNull: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Shift is required`,
          },
          isInt: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Shift must integer`,
          },
        },
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Time is required`,
          },
          notNull: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Time is required`,
          },
        },
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Date is required`,
          },
          notNull: {
            msg: `${ERROR_TYPE.ERROR_TYPE.database} Date is required`,
          },
        },
      },
      createdBy: {
        type: DataTypes.STRING,
      },
      modifiedBy: {
        type: DataTypes.STRING,
      },
      isDeleted: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "mine_inspection",
    }
  );
  mine_inspection.beforeCreate((instance, options) => {
    instance.isDeleted = 0;
  });
  return mine_inspection;
};
