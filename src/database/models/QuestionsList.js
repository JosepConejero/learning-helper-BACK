const { model, Schema } = require("mongoose");

const QuestionsListSchema = new Schema({
  listName: {
    type: String,
    required: true,
  },
  listSubject: {
    type: String,
    required: true,
  },
  questions: {
    type: [Schema.Types.ObjectId],
    ref: "Question",
    default: [],
  },
  username: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const QuestionsList = model(
  "QuestionsList",
  QuestionsListSchema,
  "questionslists"
);

module.exports = QuestionsList;
