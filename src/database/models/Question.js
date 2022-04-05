const { model, Schema } = require("mongoose");

const QuestionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  questionsLists: {
    type: [Schema.Types.ObjectId],
    ref: "QuestionsList",
    default: [],
  },
  username: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Question = model("Question", QuestionSchema, "questions");

module.exports = Question;
