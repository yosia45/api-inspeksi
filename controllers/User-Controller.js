"use strict";

const { user } = require("../models/index");
const { Op } = require("sequelize");
const succesResponseFunction = require("../helpers/succesResponseFunction");

// This controller used for local-development until this server moved to the gitlab!!!
class UserController {
  static async getUser(req, res, next) {
    try {
      const { name, nopeg } = req.query;
      const options = {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
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
      if (nopeg) {
        options.where.name = {
          [Op.iLike]: `%${nopeg}%`,
        };
      }
      let users = await user.findAll(options);
      res.status(200).json(succesResponseFunction("success", null, { users }));
    } catch (err) {
      next(err);
    }
  }
  static async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      let userById = await user.findByPk(id);
      if (!userById) {
        throw { name: "UserNotFound" };
      }
      res
        .status(200)
        .json(succesResponseFunction("success", null, { userById }));
    } catch (err) {
      next(err);
    }
  }
  static async addUser(req, res, next) {
    try {
      const { name, nopeg } = req.body;
      if (!name) {
        throw { name: "UserNameIsRequired" };
      }
      if (!nopeg) {
        throw { name: "NopegIsRequired" };
      }
      let createdUser = await user.create({
        name,
        nopeg: "0000035",
      });
      res.status(201).json(
        succesResponseFunction("success", "New user success to add", {
          createdUser: createdUser.id,
        })
      );
    } catch (err) {
      next(err);
    }
  }
  static async editUser(req, res, next) {
    try {
      const { id } = req.params;
      const { name, nopeg } = req.query;
      let userById = await user.findByPk(id);
      if (!userById) {
        throw { name: "UserNotFound" };
      }
      if (!name) {
        throw { name: "UserNameIsRequired" };
      }
      if (!nopeg) {
        throw { name: "NopegIsRequired" };
      }
      await user.update(
        {
          name,
          nopeg,
        },
        {
          where: {
            id: id,
          },
        }
      );
      res
        .status(200)
        .json(succesResponseFunction("success", "User editing success", null));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
