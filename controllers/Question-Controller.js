"use strict";

const {
  question,
  sequelize,
  question_category,
  log,
} = require("../models/index");
const { Op } = require("sequelize");
const succesResponseFunction = require("../helpers/succesResponseFunction");

class QuestionController {
  static async getAllQuestions(req, res, next) {
    try {
      const { question_category_id, name } = req.query;
      const options = {
        attributes: {
          exclude: ["createdBy", "createdAt", "updatedAt", "modifiedBy"],
        },
        //addtional parameter in case there is filter category
        where: {
          isDeleted: 0,
        },
      };
      if (name) {
        options.where.name = {
          [Op.iLike]: `%${name}%`,
        };
      }
      if (question_category_id) {
        options.where.question_category_id = question_category_id;
      }
      let questions = await question.findAll(options);
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
      let questionById = await question.findByPk(id);
      if (!questionById || questionById.isDeleted === 1) {
        throw { name: "QuestionNotFound" };
      }
      res
        .status(200)
        .json(successResponseFunction("success", null, { questionById }));
    } catch (err) {
      next(err);
    }
  }
  static async addQuestion(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { name, question_category_id } = req.body;
      if (!name) {
        throw { name: "QuestionIsRequired" };
      }
      if (!question_category_id) {
        throw { name: "QuestionCategoryIsRequired" };
      }
      let createdQuestion = await question.create(
        {
          name,
          question_category_id: Number(question_category_id),
          createdBy: "0000035",
        },
        { transaction: t }
      );
      await log.create(
        {
          eventName: "Adding Data",
          value: name,
          question_id: createdQuestion.id,
          createdBy: "0000035",
        },
        { transaction: t }
      );
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
      const modifiedBy = "0000045";
      let questionById = await question.findByPk(id, {
        include: [question_category],
      });
      if (!questionById || questionById.isDeleted === 1) {
        throw { name: "QuestionNotFound" };
      }
      if (!name) {
        throw { name: "QuestionIsRequired" };
      }
      if (!question_category_id) {
        throw { name: "QuestionCategoryIsRequired" };
      }
      const logValue = (initialName, newName, initialCategory, newCategory) => {
        if (initialName !== newName) {
          return `Changing question name from ${initialName} to ${newName}`;
        } else if (initialCategory !== newCategory) {
          return `Changing question category from `;
        } else if (initialName !== newName && initialCategory !== newCategory) {
          // will be handle later....
          return `Changing question name from ${initialName} to ${newName}and question category from ${questionById.question_category.name} to`;
        } else {
          return `user didn't do any changes`;
        }
      };
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
      await log.create(
        {
          eventName: "Editing Data",
          value: logValue(
            questionById.name,
            name,
            questionById.question_category_id,
            Number(question_category_id)
          ),
          question_id: id,
          createdBy: modifiedBy,
        },
        { transaction: t }
      );
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
      const modifiedBy = "0000045";
      let questionById = await question.findByPk(id);
      if (!questionById || questionById.isDeleted === 1) {
        throw { name: "QuestionNotFound" };
      }
      await question.update(
        {
          isDeleted: 1,
          modefiedBy: modifiedBy,
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
          eventName: "Deleting Data",
          value: questionById.name,
          question_id: id,
          createdBy: modifiedBy,
        },
        { transaction: t }
      );
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
