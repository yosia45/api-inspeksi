"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("questions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      question: {
        type: Sequelize.TEXT,
      },
      question_category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "question_categories",
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
    await queryInterface.dropTable("questions");
  },
};
