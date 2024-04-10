"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("logs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      eventName: {
        type: Sequelize.STRING,
      },
      value: {
        type: Sequelize.TEXT,
      },
      createdBy: {
        type: Sequelize.STRING,
      },
      question_category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "question_categories",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      question_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "questions",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      answer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "answers",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      mine_inspection_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "mine_inspections",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      inspection_file_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "inspection_files",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      inspection_inspector_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "inspection_inspectors",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
    await queryInterface.dropTable("logs");
  },
};
