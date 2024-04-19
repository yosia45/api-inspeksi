"use strict";

const { inspection_inspector, log, sequelize } = require("../models/index");
const { Op } = require("sequelize");
const succesResponseFunction = require("../helpers/succesResponseFunction");
const logValueFunction = require("../helpers/logValueFunction");

class InspectorController {
  static async getAllInspector(req, res, next) {
    try {
      const { name, mine_inspection_id } = req.query;
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
      if (name) {
        options.where.name = {
          [Op.iLike]: `%${name}%`,
        };
      }
      let inspectors = await inspection_inspector.findAll(options);
      res
        .status(200)
        .json(succesResponseFunction("success", null, { inspectors }));
    } catch (err) {
      next(err);
    }
  }
  static async getInspectorById(req, res, next) {
    try {
      const { id } = req.params;
      let inspectorById = await inspection_inspector.findByPk(id);
      if (!inspectorById || inspectorById.isDeleted === 1) {
        throw { name: "InspectorNotFound" };
      }
      res
        .status(200)
        .json(succesResponseFunction("success", null, { inspectorById }));
    } catch (err) {
      next(err);
    }
  }
  static async addInspector(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { name, mine_inspection_id } = req.body;
      if (!name) {
        throw { name: "InspectorNameIsRequired" };
      }
      if (!mine_inspection_id) {
        throw { name: "MineInspectionIdIsRequired" };
      }
      let createdInspector = await inspection_inspector.create(
        {
          name,
          mine_inspection_id,
          createdBy: "0000035",
        },
        { transaction: t }
      );
      await log.create(
        {
          eventName: "Adding Data",
          value: name,
          inspection_inspector_id: createdInspector.id,
          createdBy: "0000035",
        },
        {
          transaction: t,
        }
      );
      await t.commit();
      res.status(201).json(
        succesResponseFunction("success", "New inspector success to add", {
          createdQuestion: createdQuestion.id,
        })
      );
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
  static async editInspector(req, res, next) {
    const t = sequelize.transaction();
    try {
      const { id } = req.params;
      const { name, mine_inspection_id } = req.body;
      const modifiedBy = "0000045";
      let inspectorById = await inspection_inspector.findByPk(id);
      if (!inspectorById || inspectorById.isDeleted === 1) {
        throw { name: "InspectorNotFound" };
      }
      if (!name) {
        throw { name: "InspectorNameIsRequired" };
      }
      if (!mine_inspection_id) {
        throw { name: "MineInspectionIdIsRequired" };
      }
      let initialValues = {
        name: inspectorById.name,
        mine_inspection_id: inspectorById.mine_inspection_id,
      };
      let newValues = {
        name,
        mine_inspection_id,
      };
      await inspection_inspector.update(
        {
          name,
          mine_inspection_id,
        },
        { where: { id: id } },
        { transaction: t }
      );
      await log.create(
        {
          eventName: "Editing Data",
          value: logValueFunction(initialValues, newValues),
          inspection_inspector_id: id,
          createdBy: modifiedBy,
        },
        { transaction: t }
      );
      await t.commit();
      res
        .status(200)
        .json(
          succesResponseFunction("success", "Inspector editing success", null)
        );
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
  static async deleteInspector(req, res, next) {
    const t = sequelize.transaction();
    try {
      const { id } = req.params;
      const modifiedBy = "0000045";
      let inspectorById = await inspection_inspector.findByPk(id);
      if (!inspectorById || inspectorById.isDeleted === 1) {
        throw { name: "InspectorNotFound" };
      }
      await inspection_inspector.update(
        {
          isDeleted: 1,
          modifiedBy: modifiedBy,
        },
        {
          where: { id: id },
        },
        { transaction: t }
      );
      await log.create(
        {
          eventName: "Deleting Data",
          value: inspectorById.name,
          inspection_inspector_id: id,
          createdBy: modifiedBy,
        },
        { transaction: t }
      );
      await t.commit();
      res
        .status(200)
        .json(
          succesResponseFunction("success", "Inspector deleting success", null)
        );
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
}

module.exports = InspectorController;
