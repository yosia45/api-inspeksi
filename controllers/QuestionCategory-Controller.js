"use strict";

const { question_category, log, sequelize } = require("../models/index");
const { Op } = require("sequelize");
const succesResponseFunction = require("../helpers/succesResponseFunction");

class QuestionCategoryController {

  static async getQuestionCategory(req, res, next) {
    try {
      const { name } = req.query;

      //options if there is a filter data and determine the dataKey that will be shown
      const options = {
        attributes: {
          exclude: ["createdBy", "createdAt", "updatedAt", "modifiedBy"],
        },
        //addtional parameter in case there is filter category
        where: {
          isDeleted: 0,
        },
      };

      //checking if there is filter by name available
      if (name) {
        options.where.name = {
          [Op.iLike]: `%${name}%`,
        };
      }
      //end of checking process

      //fetching all data based on the options
      let categories = await question_category.findAll(options);
      //end of fetching data process

      //response if all process is going well
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

      //fetching data based on id
      let categoryById = await question_category.findByPk(id);
      //end of fetching data process

      //checking the the data with that id is available or not
      if (!categoryById || categoryById.isDeleted === 1) {
        throw { name: "CategoryNotFound" };
      }
      //end of checking process
    
      //response if all process is going well
      res
        .status(200)
        .json(succesResponseFunction("success", null, { categoryById }));
    } catch (err) {
      next(err);
    }
  }

  static async addQuestionCategory(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { name } = req.body;

      //checking if there is 'name' data received from frontend side
      if (!name) {
        throw { name: "CategoryNameIsRequired" };
      }
      //end of checking 'name' process

      //insert new data into question_category table
      const createdCategory = await question_category.create(
        {
          name,
          createdBy: "0000035",
        },
        { transaction: t }
      );
      //end process insert new data into question_category table

      //insert data process to log table
      await log.create(
        {
          eventName: "Adding Data",
          value: name,
          question_category_id: createdCategory.id,
          createdBy: "0000035",
        },
        { transaction: t }
      );
      //end process insert data into log table

      //response if all process going well
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

      //this variable just addition because not up to gitlab yet
      const modifiedBy = "0000045";

      //checking if the data with that id is available or isDeleted is false
      let categoryById = await question_category.findByPk(id);
      if (!categoryById || categoryById.isDeleted === 1) {
        throw { name: "CategoryNotFound" };
      }
      //end of checking the availability data

      //checking if there is 'name' data received from frontend side
      if (!name) {
        throw { name: "CategoryNameIsRequired" };
      }
      //end of checking 'name' data process

      //edit data with id in question_category table
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
      //end process edit data with id in question_category table

      //insert data process to log table
      await log.create(
        {
          eventName: "Editing Data",
          value: `Changing from "${categoryById.name}" to "${name}"`,
          question_category_id: id,
          createdBy: modifiedBy,
        },
        { transaction: t }
      );
      //end process insert data into log table

      //response if all process going well
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

      //checking if the data with that id is available or isDeleted is false
      let categoryById = await question_category.findByPk(id);
      if (!categoryById || categoryById.isDeleted === 1) {
        throw { name: "CategoryNotFound" };
      }
      //end of checking the availability data
      
      //this variable just addition because not up to gitlab yet
      const modifiedBy = "0000045";

      //edit data with id in isDeleted column to 1 (true) in question_category table
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
      //end process edit data with id in question_category table

      //insert data process to log table
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
      //end process insert data into log table

      //response if all process going well
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
