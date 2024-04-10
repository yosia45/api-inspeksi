"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("mine_inspections", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nopeg: {
        type: Sequelize.STRING,
        references: {
          model: "users",
          key: "nopeg",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      lokasi_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "locations",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      group: {
        type: Sequelize.STRING,
      },
      shift: {
        type: Sequelize.INTEGER,
      },
      time: {
        type: Sequelize.TIME,
      },
      date: {
        type: Sequelize.DATEONLY,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      // createdBy: {
      //   type: Sequelize.STRING,
      // },
      // modifiedBy: {
      //   type: Sequelize.STRING,
      // },
      // isDeleted: {
      //   type: Sequelize.INTEGER,
      // },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("mine_inspections");
  },
};
