"use strict";

const { sequelize, log, inspection_file } = require("../models/index");
const { Op } = require("sequelize");
const succesResponseFunction = require("../helpers/succesResponseFunction");
const logValueFunction = require("../helpers/logValueFunction");
const upload = require("../middlewares/multer");

class InspectionFileController {
  static async createInspectionFile(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { mine_inspection_id } = req.body;
      let arr = [];
      req.files.map((el) => {
        let obj = {
          file_name: el.path,
          mine_inspection_id,
          createdBy: "0000035",
        };
        arr.push(obj);
        return arr;
      });
      const images = await inspection_file.bulkCreate(arr, {
        transaction: t,
      });
      await log.create({
        eventName: "Adding Data",
        
      })
      await t.commit();
      res
        .status(201)
        .json(
          succesResponseFunction(
            "success",
            "New Inspection File success to add",
            null
          )
        );
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
}

module.exports = InspectionFileController;
