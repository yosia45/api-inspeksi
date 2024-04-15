"use strict";

const { location, log, sequelize } = require("../models/index");
const { Op, where } = require("sequelize");
const succesResponseFunction = require("../helpers/succesResponseFunction");

class LocationController {
  static async getAllLocation(req, res, next) {
    try {
      const { name } = req.query;
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
      let locations = await location.findAll(options);
      res
        .status(200)
        .json(succesResponseFunction("success", null, { locations }));
    } catch (err) {
      next(err);
    }
  }
  static async getLocationById(req, res, next) {
    try {
      const { id } = req.params;
      let locationById = await location.findByPk(id);
      if (!locationById || locationById.isDeleted === 1) {
        throw { name: "LocationNotFound" };
      }
      res
        .status(200)
        .json(succesResponseFunction("success", null, { locationById }));
    } catch (err) {
      next(err);
    }
  }
  static async addLocation(req, res, next) {
    try {
      const { name } = req.body;
      if (!name) {
        throw { name: "LocationNameIsRequired" };
      }
      let createdLocation = await location.create({
        name,
        createdBy: "0000035",
      });
      res.status(201).json(
        succesResponseFunction("success", "New category success to add", {
          createdLocation: createdLocation.id,
        })
      );
    } catch (err) {
      next(err);
    }
  }
  static async editLocation(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const modifiedBy = "0000045";
      let locationById = await location.findByPk(id);
      if (!locationById || locationById.isDeleted === 1) {
        throw { name: "LocationNotFound" };
      }
      if (!name) {
        throw { name: "LocationNameIsRequired" };
      }
      await location.update(
        {
          name,
          modifiedBy,
        },
        {
          where: {
            id: id,
          },
        }
      );
      res
        .status(200)
        .json(
          succesResponseFunction("success", "Location editing success", null)
        );
    } catch (err) {
      next(err);
    }
  }
  static async deleteLocation(req, res, next) {
    try {
      const { id } = req.params;
      const modifiedBy = "0000045";
      let locationById = await location.findByPk(id);
      if (!locationById || locationById.isDeleted === 1) {
        throw { name: "LocationNotFound" };
      }
      await location.update(
        {
          isDeleted: 1,
          modifiedBy,
        },
        {
          where: {
            id: id,
          },
        }
      );
      res
        .status(200)
        .json(
          succesResponseFunction("success", "Location deleting success", null)
        );
    } catch (err) {
      next(err);
    }
  }
}

module.exports = LocationController;
