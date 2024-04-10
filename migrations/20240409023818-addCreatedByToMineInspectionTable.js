"use strict";

const ERROR_TYPE = require("../helpers/constant");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("mine_inspections", "createdBy", {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `${ERROR_TYPE.ERROR_TYPE.database} createdBy is required`,
        },
        notEmpty: {
          msg: `${ERROR_TYPE.ERROR_TYPE.database} createdBy is required`,
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("mine_inspections", "createdBy");
  },
};
