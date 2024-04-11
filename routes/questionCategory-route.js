const express = require("express");
const router = express.Router();
const QuestionCategoryController = require("../controllers/QuestionCategory-Controller");

router.get("/", QuestionCategoryController.getQuestionCategory);
router.get("/:id", QuestionCategoryController.getQuestionCategoryById);
router.post("/", QuestionCategoryController.addQuestionCategory);
router.put("/:id", QuestionCategoryController.editQuestionCategoryData);
router.patch("/:id", QuestionCategoryController.deleteQuestionCategory);

module.exports = router;
