'use strict';
const ERROR_TYPE = require('../helpers/constant')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.mine_inspection,{foreignKey:'nopeg'})
    }
  }
  user.init({
    name: DataTypes.STRING,
    nopeg: {
      type: DataTypes.STRING,
      unique: {msg:`${ERROR_TYPE.ERROR_TYPE.database} Nomor Pegawai already registered`}
    },
    isDeleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
  });
  user.beforeCreate((instance, options) => {
    instance.isDeleted = 0;
  });
  return user;
};