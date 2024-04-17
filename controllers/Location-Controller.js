"use strict";

const { location, log, sequelize } = require("../models/index");
const { Op } = require("sequelize");
const succesResponseFunction = require("../helpers/succesResponseFunction");

class LocationController {
  static async getAllLocation(req, res, next) {
    try {
      const { name } = req.query;

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

      //fetching all data based on the options
      let locations = await location.findAll(options);
      //end of fetching data process

      //response if all process is going well
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

      //fetching data based on id
      let locationById = await location.findByPk(id);

      //checking the the data with that id is available or not
      if (!locationById || locationById.isDeleted === 1) {
        throw { name: "LocationNotFound" };
      }
      //end of checking process

      //response if all process is going well
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

      //checking if there is 'name' data received from frontend side
      if (!name) {
        throw { name: "LocationNameIsRequired" };
      }
      //end of checking 'name' process

      //insert new data into location table
      let createdLocation = await location.create({
        name,
        createdBy: "0000035",
      });
      //end process insert new data into location table

      //response if all process going well
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

      //this variable just addition because not up to gitlab yet
      const modifiedBy = "0000045";

      //checking if the data with that id is available or isDeleted is false
      let locationById = await location.findByPk(id);
      if (!locationById || locationById.isDeleted === 1) {
        throw { name: "LocationNotFound" };
      }
      //end of checking the availability data

      //checking if there is 'name' data received from frontend side
      if (!name) {
        throw { name: "LocationNameIsRequired" };
      }
      //end of checking 'name' data process

      //edit data with id in location table
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
      //end process edit data with id in location table

      //response if all process going well
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

      //this variable just addition because not up to gitlab yet
      const modifiedBy = "0000045";

      //checking if the data with that id is available or isDeleted is false
      let locationById = await location.findByPk(id);
      if (!locationById || locationById.isDeleted === 1) {
        throw { name: "LocationNotFound" };
      }
      //end of checking the availability data

      //edit data with id in isDeleted column to 1 (true) in location table
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
      //end process edit data with id in location table

      //response if all process going well
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
