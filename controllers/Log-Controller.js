"use strict";

const { log } = require("../models/index");
const succesResponseFunction = require("../helpers/succesResponseFunction");

class LogController {
  static async getAllHistories(req, res, next) {
    try {
      const {
        question_category_id,
        question_id,
        answer_id,
        mine_inspection_id,
        inspection_file_id,
        inspection_inspector_id,
        createdBy,
      } = req.query;
      const options = {
        attributes: {
          exclude: ["updatedAt", "modifiedBy"],
        },
        //addtional parameter in case there is filter category
        where: {},
      };
      if (question_category_id) {
        options.where.question_category_id = question_category_id;
      }
      if (question_id) {
        options.where.question_id = question_id;
      }
      if (answer_id) {
        options.where.answer_id = answer_id;
      }
      if (mine_inspection_id) {
        options.where.mine_inspection_id = mine_inspection_id;
      }
      if (inspection_file_id) {
        options.where.inspection_file_id = inspection_file_id;
      }
      if (inspection_inspector_id) {
        options.where.inspection_inspector_id = inspection_inspector_id;
      }
      if (createdBy) {
        options.where.createdBy = createdBy;
      }
      let logs = await log.findAll(options);
      res.status(200).json(succesResponseFunction("success", null, { logs }));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = LogController;
