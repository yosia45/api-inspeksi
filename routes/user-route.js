const express = require("express");
const router = express.Router();
const UserController = require("../controllers/User-Controller");

router.get("/", UserController.getUser);
router.get("/:id", UserController.getUserById);
router.post("/", UserController.addUser);
router.put("/:id", UserController.editUser);

module.exports = router;