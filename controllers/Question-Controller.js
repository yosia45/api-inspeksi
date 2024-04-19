"use strict";

const {
  question,
  sequelize,
  question_category,
  log,
} = require("../models/index");
const { Op } = require("sequelize");
const succesResponseFunction = require("../helpers/succesResponseFunction");
const logValueFunction = require("../helpers/logValueFunction");

class QuestionController {
  static async getAllQuestions(req, res, next) {
    try {
      const { question_category_id, name } = req.query;

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

      //checking if there is filter by question_category_id available
      if (question_category_id) {
        options.where.question_category_id = question_category_id;
      }
      //end of checking process

      //fetching all data based on the options
      let questions = await question.findAll(options);
      //end of fetching data process

      //response if all process is going well
      res
        .status(200)
        .json(succesResponseFunction("success", null, { questions }));
    } catch (err) {
      next(err);
    }
  }
  static async getQuestionById(req, res, next) {
    try {
      const { id } = req.params;

      //fetching data based on id
      let questionById = await question.findByPk(id);
      //end of fetching data process

      //checking the the data with that id is available or not
      if (!questionById || questionById.isDeleted === 1) {
        throw { name: "QuestionNotFound" };
      }
      //end of checking process

      //response if all process is going well
      res
        .status(200)
        .json(succesResponseFunction("success", null, { questionById }));
    } catch (err) {
      next(err);
    }
  }
  static async addQuestion(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { name, question_category_id } = req.body;

      //checking if there is 'name' data received from frontend side
      if (!name) {
        throw { name: "QuestionIsRequired" };
      }
      //end of checking 'name' process

      //checking if there is 'question_category_id' data received from frontend side
      if (!question_category_id) {
        throw { name: "QuestionCategoryIsRequired" };
      }
      //end of checking 'question_category_id' process

      //insert new data into question table
      let createdQuestion = await question.create(
        {
          name,
          question_category_id: Number(question_category_id),
          createdBy: "0000035",
        },
        { transaction: t }
      );
      //end process insert new data into question table

      //insert data process to log table
      await log.create(
        {
          eventName: "Adding Data",
          value: name,
          question_id: createdQuestion.id,
          createdBy: "0000035",
        },
        { transaction: t }
      );
      //end process insert data into log table

      //response if all process going well
      await t.commit();
      res.status(201).json(
        succesResponseFunction("success", "New question success to add", {
          createdQuestion: createdQuestion.id,
        })
      );
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
  static async editQuestion(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const { name, question_category_id } = req.body;

      //this variable just addition because not up to gitlab yet
      const modifiedBy = "0000045";

      //checking if the data with that id is available or isDeleted is false
      let questionById = await question.findByPk(id, {
        include: [question_category],
      });
      if (!questionById || questionById.isDeleted === 1) {
        throw { name: "QuestionNotFound" };
      }
      //end of checking the availability data

      //checking if there is 'name' data received from frontend side
      if (!name) {
        throw { name: "QuestionIsRequired" };
      }
      //end of checking 'name' data process

      //checking if there is 'question_category_id' data received from frontend side
      if (!question_category_id) {
        throw { name: "QuestionCategoryIsRequired" };
      }
      //end of checking 'question_category_id' data process

      //variable for parameter in function
      let initialValues = {
        name: questionById.name,
        question_category_id: questionById.question_category_id,
      };

      //variable for parameter in function
      let newValues = {
        name,
        question_category_id,
      };

      //edit data with id in question table
      await question.update(
        {
          name,
          question_category_id,
          modifiedBy,
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
      //end process edit data with id in question table

      //insert data process to log table
      await log.create(
        {
          eventName: "Editing Data",
          value: logValueFunction(initialValues, newValues),
          question_id: id,
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
          succesResponseFunction("success", "Question editing success", null)
        );
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
  static async deleteQuestion(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;

      //this variable just addition because not up to gitlab yet
      const modifiedBy = "0000045";

      //checking if the data with that id is available or isDeleted is false
      let questionById = await question.findByPk(id);
      if (!questionById || questionById.isDeleted === 1) {
        throw { name: "QuestionNotFound" };
      }
      //end of checking the availability data

      //edit data with id in isDeleted column to 1 (true) in question table
      await question.update(
        {
          isDeleted: 1,
          modifiedBy: modifiedBy,
        },
        {
          where: {
            id: id,
          },
        },
        { transaction: t }
      );
      //end process edit data with id in question table

      //insert data process to log table
      await log.create(
        {
          eventName: "Deleting Data",
          value: questionById.name,
          question_id: id,
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
          succesResponseFunction("success", "Question deleting success", null)
        );
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
}

module.exports = QuestionController;
