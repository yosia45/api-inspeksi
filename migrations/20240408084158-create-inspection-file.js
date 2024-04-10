"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("inspection_files", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      file_name: {
        type: Sequelize.STRING,
      },
      mine_inspection_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "mine_inspections",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      createdBy: {
        type: Sequelize.STRING,
      },
      modifiedBy: {
        type: Sequelize.STRING,
      },
      isDeleted: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("inspection_files");
  },
};
