"use strict";

const { question_category, log, sequelize } = require("../models/index");
const { Op } = require("sequelize");
const succesResponseFunction = require("../helpers/succesResponseFunction");

class QuestionCategoryController {
  static async getQuestionCategory(req, res, next) {
    try {
      const { name } = req.query;
      const options = {
        attributes: {
          exclude: ["createdBy", "createdAt", "updatedAt", "modifiedBy"],
        },
        //addtional parameter in case there is filter category
        where: {
          isDeleted: 0,
        },
      };

      //filter by name
      if (name) {
        options.where.name = {
          [Op.iLike]: `%${name}%`,
        };
      }
      let categories = await question_category.findAll(options);
      res
        .status(200)
        .json(succesResponseFunction("success", null, { categories }));
    } catch (err) {
      next(err);
    }
  }
  static async getQuestionCategoryById(req, res, next) {
    try {
      const { id } = req.params;
      let categoryById = await question_category.findByPk(id);
      if (!categoryById || categoryById.isDeleted === 1) {
        throw { name: "CategoryNotFound" };
      }
      res
        .status(200)
        .json(successResponseFunction("success", null, { categoryById }));
    } catch (err) {
      next(err);
    }
  }
  static async addQuestionCategory(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { name } = req.body;
      if (!name) {
        throw { name: "NameOfCategoryIsRequired" };
      }
      const createdCategory = await question_category.create(
        {
          name,
          createdBy: "0000035",
        },
        { transaction: t }
      );
      await log.create(
        {
          eventName: "Adding Data",
          value: name,
          question_category_id: createdCategory.id,
          createdBy: "0000035",
        },
        { transaction: t }
      );
      await t.commit();
      res.status(201).json(
        succesResponseFunction("success", "New category success to add", {
          createdCategory: createdCategory.id,
        })
      );
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
  static async editQuestionCategoryData(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const { name } = req.body;
      const modifiedBy = "0000045"
      let categoryById = await question_category.findByPk(id);
      if (!categoryById) {
        throw { name: "CategoryNotFound" || categoryById.isDeleted === 1 };
      }
      if (!name) {
        throw { name: "NameOfCategoryIsRequired" };
      }
      await question_category.update(
        {
          name,
          modifiedBy,
        },
        {
          where: {
            id: id,
          },
        },
        { transaction: t }
      );
      await log.create(
        {
          eventName: "Editing Data",
          value: `Changing from "${categoryById.name}" to "${name}"`,
          question_category_id: id,
          createdBy: modifiedBy,
        },
        { transaction: t }
      );
      await t.commit();
      res
        .status(200)
        .json(
          succesResponseFunction("success", "Category editing success", null)
        );
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
  static async deleteQuestionCategory(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      let categoryById = await question_category.findByPk(id);
      const modifiedBy = "0000045"
      if (!categoryById) {
        throw { name: "CategoryNotFound" || categoryById.isDeleted === 1 };
      }
      await question_category.update(
        {
          isDeleted: 1,
          modifiedBy: modifiedBy,
        },
        {
          where: {
            id: id,
          },
        },
        {
          transaction: t,
        }
      );
      await log.create(
        {
          eventName: "Deleting Data",
          value: categoryById.name,
          question_category_id: id,
          createdBy: modifiedBy,
        },
        {
          transaction: t,
        }
      );
      await t.commit();
      res
        .status(200)
        .json(
          succesResponseFunction("success", "Category deleting success", null)
        );
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
}

module.exports = QuestionCategoryController;
