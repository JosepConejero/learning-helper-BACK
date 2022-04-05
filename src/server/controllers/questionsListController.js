require("dotenv").config();
const QuestionsList = require("../../database/models/QuestionsList");

const getAllQuestionsLists = async (req, res) => {
  const questionsLists = await QuestionsList.find();
  res.json({ questionsLists });
};

const getAQuestionsList = async (req, res, next) => {
  const { idQuestionsList } = req.params;
  try {
    const questionsList = await QuestionsList.findById(idQuestionsList);
    if (questionsList) {
      res.json(questionsList);
    } else {
      const error = new Error("Questions List not found"); // si es vuit
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
};

const addQuestionsList = async (req, res, next) => {
  try {
    const questionsList = req.body;
    const newQuestionsList = await QuestionsList.create(questionsList);
    res.status(201).json(newQuestionsList);
  } catch (error) {
    next(error);
  }
};

const deleteQuestionsList = async (req, res, next) => {
  const { idQuestionsList } = req.params;
  try {
    const questionsList = await QuestionsList.findByIdAndDelete(
      idQuestionsList
    );
    if (questionsList) {
      res.status(200);
      res.json(idQuestionsList);
    } else {
      const error = new Error("Questions List not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
};

const updateQuestionsList = async (req, res, next) => {
  const { idQuestionsList } = req.params;
  try {
    const questionsList = req.body;
    const updatedQuestionsList = await QuestionsList.findByIdAndUpdate(
      idQuestionsList,
      questionsList
    );
    res.status(200).json(updatedQuestionsList);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllQuestionsLists,
  getAQuestionsList,
  addQuestionsList,
  deleteQuestionsList,
  updateQuestionsList,
};
