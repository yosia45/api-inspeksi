const express = require("express");
const router = express.Router();
const QuestionController = require("../controllers/Question-Controller");

router.get("/", QuestionController.getAllQuestions);
router.get("/:id", QuestionController.getQuestionById);
router.post("/", QuestionController.addQuestion);
router.put("/:id", QuestionController.editQuestion);
router.patch("/:id", QuestionController.deleteQuestion);

module.exports = router;
