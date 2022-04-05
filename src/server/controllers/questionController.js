require("dotenv").config();
const Question = require("../../database/models/Question");

const getAllQuestions = async (req, res) => {
  const questions = await Question.find();
  res.json({ questions });
};

const getAQuestion = async (req, res, next) => {
  const { idQuestion } = req.params;
  try {
    const question = await Question.findById(idQuestion);
    if (question) {
      res.json(question);
    } else {
      const error = new Error("Question not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
};

const addQuestion = async (req, res, next) => {
  try {
    const question = req.body;
    const newQuestion = await Question.create(question);
    res.status(201).json(newQuestion);
  } catch (error) {
    next(error);
  }
};

const deleteQuestion = async (req, res, next) => {
  const { idQuestion } = req.params;
  try {
    const question = await Question.findByIdAndDelete(idQuestion);
    if (question) {
      res.status(200);
      res.json(idQuestion);
    } else {
      const error = new Error("Question not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
};

const updateQuestion = async (req, res, next) => {
  const { idQuestion } = req.params;
  try {
    const question = req.body;
    const updatedQuestion = await Question.findByIdAndUpdate(
      idQuestion,
      question
    );
    res.status(200).json(updatedQuestion);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllQuestions,
  getAQuestion,
  addQuestion,
  deleteQuestion,
  updateQuestion,
};
