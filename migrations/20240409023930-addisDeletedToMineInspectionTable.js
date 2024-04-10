"use strict";

const ERROR_TYPE = require("../helpers/constant");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("mine_inspections", "isDeleted", {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `${ERROR_TYPE.ERROR_TYPE.database} isDeleted is required`,
        },
        notEmpty: {
          msg: `${ERROR_TYPE.ERROR_TYPE.database} isDeleted is required`,
        },
        isInt: {
          msg: `${ERROR_TYPE.ERROR_TYPE.database} isDeleted must integer`,
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("mine_inspections", "isDeleted");
  },
};
