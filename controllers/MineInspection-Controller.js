"use strict";

const { mine_inspection, log, sequelize } = require("../models/index");
const { Op } = require("sequelize");
const succesResponseFunction = require("../helpers/succesResponseFunction");
const logValueFunction = require("../helpers/logValueFunction");
const moment = require("moment");

class MineInspectionController {
  static async getAllMineInspection(req, res, next) {
    try {
      const { lokasi_id, group, shift } = req.query;

      //options if there is a filter data and determine the dataKey that will be shown
      const options = {
        attributes: {
          exclude: ["createdBy", "createdAt", "updatedAt", "modifiedBy"],
        },
        //addtional parameter in case there is/are filter category available
        where: {
          isDeleted: 0,
        },
      };
      //checking if there is filter by lokasi_id available
      if (lokasi_id) {
        options.where.lokasi_id = lokasi_id;
      }
      //end of checking process

      //checking if there is filter by group available
      if (group) {
        options.where.group = {
          [Op.iLike]: `%${group}%`,
        };
      }
      //end of checking process

      //checking if there is filter by shift available
      if (shift) {
        options.where.shift = shift;
      }
      //end of checking process

      //fetching all data based on the options
      let mineInspections = await mine_inspection.findAll(options);
      //end of fetching data process

      //response if all process is going well
      res
        .status(200)
        .json(succesResponseFunction("success", null, { mineInspections }));
    } catch (err) {
      next(err);
    }
  }
  static async getMineInspectionById(req, res, next) {
    try {
      const { id } = req.params;

      //fetching data based on id
      let mineInspectionById = await mine_inspection.findByPk(id);
      //end of fetching data process

      //checking the the data with that id is available or not
      if (!mineInspectionById || mineInspectionById.isDeleted === 1) {
        throw { name: "MineInspectionNotFound" };
      }
      //end of checking process

      //response if all process is going well
      res
        .status(200)
        .json(succesResponseFunction("success", null, { mineInspectionById }));
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async addMineInspections(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { lokasi_id, group, shift, time, date } = req.body;

      const newFormatedTime = new Date(time).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      const newFormatedDate = new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      //checking if there is 'lokasi_id' data received from frontend side
      if (!lokasi_id) {
        throw { name: "LokasiIdIsRequired" };
      }
      //end of checking 'lokasi_id' process

      //checking if there is 'group' data received from frontend side
      if (!group) {
        throw { name: "GroupIsRequired" };
      }
      //end of checking 'group' process

      //checking if there is 'shift' data received from frontend side
      if (!shift) {
        throw { name: "ShiftIsRequired" };
      }
      //end of checking 'shift' process

      //checking if there is 'time' data received from frontend side
      if (!time) {
        throw { name: "TimeIsRequired" };
      }
      //end of checking 'time' process

      //checking if there is 'date' data received from frontend side
      if (!date) {
        throw { name: "DateIsRequired" };
      }
      //end of checking 'date' process

      //insert new data into mine_inspection table
      let createdMineInspection = await mine_inspection.create(
        {
          nopeg: "0000045",
          lokasi_id,
          group,
          shift,
          time: newFormatedTime,
          date: newFormatedDate,
          createdBy: "0000035",
        },
        {
          transaction: t,
        }
      );
      //end process insert new data into mine_inspection table

      //insert data process to log table
      await log.create(
        {
          eventName: "Adding Data",
          value: `Adding New Mine Inspection data with details: nopeg:"0000045", lokasi_id:${lokasi_id}, group:${group}, shift:${shift}, time:${time}, date:${date}`,
          mine_inspection_id: createdMineInspection.id,
          createdBy: "0000045",
        },
        { transaction: t }
      );
      //end process insert data into log table

      //response if all process going well
      await t.commit();
      res.status(201).json(
        succesResponseFunction(
          "success",
          "New mine inspection success to add",
          {
            createdMineInspection: createdMineInspection.id,
          }
        )
      );
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
  static async editMineInspection(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const { lokasi_id, group, shift, time, date } = req.body;

      //this variable just addition because not up to gitlab yet
      const modifiedBy = "0000045";

      const newFormatedTime = new Date(time).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      const newFormatedDate = new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      //checking if the data with that id is available or isDeleted is false
      let mineInspectionById = await mine_inspection.findByPk(id);
      if (!mineInspectionById || mineInspectionById.isDeleted === 1) {
        throw { name: "MineInspectionNotFound" };
      }
      //end of checking the availability data

      //checking if there is 'lokasi_id' data received from frontend side
      if (!lokasi_id) {
        throw { name: "LokasiIdIsRequired" };
      }
      //end of checking 'lokasi_id' process

      //checking if there is 'group' data received from frontend side
      if (!group) {
        throw { name: "GroupIsRequired" };
      }
      //end of checking 'group' process

      //checking if there is 'shift' data received from frontend side
      if (!shift) {
        throw { name: "ShiftIsRequired" };
      }
      //end of checking 'shift' process

      //checking if there is 'time' data received from frontend side
      if (!time) {
        throw { name: "TimeIsRequired" };
      }
      //end of checking 'time' process

      //checking if there is 'date' data received from frontend side
      if (!date) {
        throw { name: "DateIsRequired" };
      }
      //end of checking 'date' process

      //variable for parameter in function
      let initialValues = {
        lokasi_id: mineInspectionById.lokasi_id,
        group: mineInspectionById.group,
        shift: mineInspectionById.shift,
        time: mineInspectionById.time,
        date: mineInspectionById.date,
      };

      //variable for parameter in function
      let newValues = {
        lokasi_id,
        group,
        shift,
        time,
        date,
      };

      //edit data with id in mine_inspection table
      await mine_inspection.update(
        {
          nopeg: "0000045",
          lokasi_id,
          group,
          shift,
          time: newFormatedTime,
          date: newFormatedDate,
        },
        { where: { id: id } },
        { transaction: t }
      );
      //end process edit data with id in mine_inspection table

      //insert data process to log table
      await log.create(
        {
          eventName: "Editing Data",
          value: logValueFunction(initialValues, newValues),
          mine_inspection_id: id,
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
          succesResponseFunction(
            "success",
            "Mine inspection editing success",
            null
          )
        );
    } catch (err) {
      console.log(err);
      await t.rollback();
      next(err);
    }
  }
  static async deleteMineInspection(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;

      //this variable just addition because not up to gitlab yet
      const modifiedBy = "0000045";

      //checking if the data with that id is available or isDeleted is false
      let mineInspectionById = await mine_inspection.findByPk(id);
      if (!mineInspectionById || mineInspectionById.isDeleted === 1) {
        throw { name: "MineInspectionNotFound" };
      }
      //end of checking the availability data

      //edit data with id in isDeleted column to 1 (true) in question_category table
      await mine_inspection.update(
        {
          isDeleted: 1,
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
          eventName: "Deleting Data",
          value: mineInspectionById.nopeg /*will be revised later*/,
          mine_inspection_id: id,
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
          succesResponseFunction(
            "success",
            "Mine Inspection deleting success",
            null
          )
        );
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
}

module.exports = MineInspectionController;
