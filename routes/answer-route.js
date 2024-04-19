const express = require("express");
const router = express.Router();
const AnswerController = require("../controllers/Answer-Controller");

router.get("/", AnswerController.getAllAnswer);
router.get("/:id", AnswerController.getAnswerById);
router.post("/", AnswerController.addAnswer);
router.put("/:id", AnswerController.editAnswer);
router.patch("/:id", AnswerController.deleteAnswer);

module.exports = router;