"use strict";
const { answer, log, sequelize } = require("../models/index");
const { Op } = require("sequelize");
const succesResponseFunction = require("../helpers/succesResponseFunction");

class AnswerController {
  static async getAllAnswer(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
  static async getAnswerById(req, res, next) {
    try {
      const { id } = req.params;
    } catch (err) {
      next(err);
    }
  }
  static async addAnswer(req, res, next) {
    const t = await sequelize.transaction();
    try {
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
  static async editAnswer(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
  static async deleteAnswer(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
}

module.exports = AnswerController;
