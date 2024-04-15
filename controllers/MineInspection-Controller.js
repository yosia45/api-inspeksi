"use strict";

const { mine_inspection, log, sequelize } = require("../models/index");
const { Op } = require("sequelize");
const succesResponseFunction = require("../helpers/succesResponseFunction");

class MineInspectionController {
  static async getAllMineInspection(req, res, next) {
    try {
      const { lokasi_id, group, shift } = req.query;
      const options = {
        attributes: {
          exclude: ["createdBy", "createdAt", "updatedAt", "modifiedBy"],
        },
        //addtional parameter in case there is filter category
        where: {
          isDeleted: 0,
        },
      };
      if (lokasi_id) {
        options.where.lokasi_id = lokasi_id;
      }
      if (group) {
        options.where.group = {
          [Op.iLike]: `%${group}%`,
        };
      }
      if (shift) {
        options.where.shift = shift;
      }
      let mineInspections = await mine_inspection.findAll(options);
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
      let mineInspectionById = await mine_inspection.findByPk(id);
      if (!mineInspectionById || mineInspectionById.isDeleted === 1) {
        throw { name: "MineInspectionNotFound" };
      }
      res
        .status(200)
        .json(successResponseFunction("success", null, { mineInspectionById }));
    } catch (err) {
      next(err);
    }
  }
  static async addMineInspections(req, res, next) {
    const t = sequelize.transaction();
    try {
      const { lokasi_id, group, shift, time, date } = req.body;
      if (!lokasi_id) {
        throw { name: "LokasiIdIsRequired" };
      }
      if (!group) {
        throw { name: "GroupIsRequired" };
      }
      if (!shift) {
        throw { name: "ShiftIsRequired" };
      }
      if (!time) {
        throw { name: "TimeIsRequired" };
      }
      if (!date) {
        throw { name: "DateIsRequired" };
      }
      let createdMineInspection = await mine_inspection.create(
        {
          nopeg: "0000035",
          lokasi_id,
          group,
          shift,
          time,
          date,
          createdBy: "0000035",
        },
        {
          transaction: t,
        }
      );
      await log.create(
        {
          eventName: "Adding Data",
          value: `Adding New Mine Inspection data with details: nopeg:${nopeg}, lokasi_id:${lokasi_id}, group:${group}, shift:${shift}, time:${time}, date:${date}`,
          mine_inspection_id: createdMineInspection.id,
          createdBy: "0000035",
        },
        { transaction: t }
      );
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
    const t = sequelize.transaction();
    try {
      const { id } = req.params;
      const { lokasi_id, group, shift, time, date } = req.body;
      const modifiedBy = "0000045";
      let mineInspectionById = await mine_inspection.findByPk(id);
      if (!mineInspectionById || mineInspectionById.isDeleted === 1) {
        throw { name: "MineInspectionNotFound" };
      }
      if (!lokasi_id) {
        throw { name: "LokasiIdIsRequired" };
      }
      if (!group) {
        throw { name: "GroupIsRequired" };
      }
      if (!shift) {
        throw { name: "ShiftIsRequired" };
      }
      if (!time) {
        throw { name: "TimeIsRequired" };
      }
      if (!date) {
        throw { name: "DateIsRequired" };
      }
      const logValue = (initialValues, newValues) => {
        let changes = "";
        let changeCount = 0;

        for (const key in initialValues) {
          if (
            initialValues.hasOwnProperty(key) &&
            newValues.hasOwnProperty(key)
          ) {
            if (initialValues[key] !== newValues[key]) {
              if (changeCount > 0) {
                changes += ", ";
              }
              changes += `${key} from ${initialValues[key]} to ${newValues[key]}`;
              changeCount++;
            }
          }
        }
        if (changeCount === 0) {
          return "";
        } else if (changeCount === 1) {
          return `There is ${changes}`;
        } else {
          const lastIndex = changes.lastIndexOf(", ");
          return `There are ${changes.slice(0, lastIndex)} and ${changes.slice(
            lastIndex + 2
          )}`;
        }
      };
      let initialValues = {
        lokasi_id: mineInspectionById.lokasi_id,
        group: mineInspectionById.group,
        shift: mineInspectionById.shift,
        time: mineInspectionById.time,
        date: mineInspectionById.date,
      };
      let newValues = {
        lokasi_id,
        group,
        shift,
        time,
        date,
      };
      await log.create(
        {
          eventName: "Editing Data",
          value: logValue(initialValues, newValues),
          mine_inspection_id: id,
          createdBy: modifiedBy,
        },
        { transaction: t }
      );
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
      await t.rollback();
      next(err);
    }
  }
  static async deleteMineInspection(req, res, next) {
    const t = sequelize.transaction();
    try {
      const { id } = req.params;
      const modifiedBy = "0000045";
      let mineInspectionById = await mine_inspection.findByPk(id);
      if (!mineInspectionById || mineInspectionById.isDeleted === 1) {
        throw { name: "MineInspectionNotFound" };
      }
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
      await log.create(
        {
          eventName: "Deleting Data",
          value: mineInspectionById.nopeg /*will be revised later*/,
          mine_inspection_id: id,
          createdBy: modifiedBy,
        },
        { transaction: t }
      );
      await t.commit()
      res
        .status(200)
        .json(
          succesResponseFunction("success", "Mine Inspection deleting success", null)
        );
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
}

module.exports = MineInspectionController;
