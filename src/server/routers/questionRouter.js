require("dotenv").config();
const express = require("express");
const {
  getAllQuestions,
  getAQuestion,
  addQuestion,
  deleteQuestion,
  updateQuestion,
} = require("../controllers/questionController");

const router = express.Router();

router.get("/", getAllQuestions);
router.get("/:idQuestion", getAQuestion);
router.post("/", addQuestion);
router.delete("/:idQuestion", deleteQuestion);
router.put("/:idQuestion", updateQuestion);

module.exports = router;
