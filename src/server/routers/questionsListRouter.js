require("dotenv").config();
const express = require("express");
const {
  getAllQuestionsLists,
  getAQuestionsList,
  addQuestionsList,
  deleteQuestionsList,
  updateQuestionsList,
} = require("../controllers/questionsListController");

const router = express.Router();

router.get("/", getAllQuestionsLists);
router.get("/:idQuestionsList", getAQuestionsList);
router.post("/", addQuestionsList);
router.delete("/:idQuestionsList", deleteQuestionsList);
router.put("/:idQuestionsList", updateQuestionsList);

module.exports = router;
