"use strict";
const { answer, question, sequelize } = require("../models/index");
const succesResponseFunction = require("../helpers/succesResponseFunction");
const logvalueFunction = require("../helpers/logValueFunction");

class AnswerController {
  static async getAllAnswer(req, res, next) {
    try {
      const { mine_inspection_id, question_id } = req.query;
      const options = {
        attributes: {
          exclude: ["createdBy", "createdAt", "updatedAt", "modifiedBy"],
        },
        //addtional parameter in case there is filter category
        where: {
          isDeleted: 0,
        },
      };
      if (mine_inspection_id) {
        options.where.mine_inspection_id = mine_inspection_id;
      }
      if (question_id) {
        options.where.question_id = question_id;
      }
      let answers = await answer.findAll(options);
      res
        .status(200)
        .json(succesResponseFunction("success", null, { answers }));
    } catch (err) {
      next(err);
    }
  }
  static async getAnswerById(req, res, next) {
    try {
      const { id } = req.params;
      let answerById = await answer.findByPk(id);
      if (!answerById || answerById.isDeleted === 1) {
        throw { name: "AnswerNotFound" };
      }
      res
        .status(200)
        .json(succesResponseFunction("success", null, { answerById }));
    } catch (err) {
      next(err);
    }
  }
  static async addAnswer(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { bulkAnswer } = req.body;
      // let bulkAnswer = [
      //   {
      //     choices: "Ya",
      //     mine_inspection_id: 7,
      //     question_id: 1,
      //     additional_information: null,
      //     createdBy: "0000035",
      //   },
      //   {
      //     choices: "Tidak",
      //     mine_inspection_id: 7,
      //     question_id: 1,
      //     additional_information: null,
      //     createdBy: "0000035",
      //   },
      // ];

      let arr = [];
      bulkAnswer.map((el) => {
        if (!el.choices) {
          throw { name: "ChoicesIsRequired" };
        }
        if ((el.choices !== "Ya" || el.choices !== "Tidak") === false) {
          throw { name: "ChoicesAvailabilityConstraint" };
        }
        if (!el.mine_inspection_id) {
          throw { name: "MineInspectionIdIsRequired" };
        }
        if (!el.question_id) {
          throw { name: "QuestionIdIsRequired" };
        }
        arr.push(el);
        return arr;
      });
      await answer.bulkCreate(arr, { transaction: t });
      await t.commit();
      res
        .status(201)
        .json(succesResponseFunction("success", "New answer success to add"));
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
  static async editAnswer(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const { choices } = req.body;
      let answerById = answer.findByPk(id);
      if (!answerById || answerById.isDeleted === 1) {
        throw { name: "AnswerNotFound" };
      }
      answer.update(
        {
          choices,
          modifiedBy: "0000045",
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
      await log.update({
        eventName: "Editing Data",
        value: logvalueFunction(answerById.choices, choices),
        answer_id: id,
        createdBy: "0000045",
      });
      await t.commit();
      res
        .status(200)
        .json(
          succesResponseFunction("success", "Answer editing success", null)
        );
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
  static async deleteAnswer(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const modifiedBy = "0000045";
      let answerById = answer.findByPk(id);
      if (!answerById || answerById.isDeleted === 1) {
        throw { name: "AnswerNotFound" };
      }
      await answer.update(
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
      await log.create(
        {
          eventName: "Deleting Data",
          value: answerById.choices,
          answer_id: id,
          createdBy: modifiedBy,
        },
        { transaction: t }
      );
      await t.commit();
      res
        .status(200)
        .json(
          succesResponseFunction("success", "Answer deleting success", null)
        );
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
}

module.exports = AnswerController;
