const Question = require("../../database/models/Question");
const {
  getAllQuestions,
  getAQuestion,
  addQuestion,
  deleteQuestion,
  updateQuestion,
} = require("./questionController");

jest.mock("../../database/models/Question");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Given a getAllQuestions controller", () => {
  describe("When it receives a GET request", () => {
    test("Then it should call method json with a list of questions in the response", async () => {
      const res = { json: jest.fn() };

      const questions = {
        id: 1,
        question: "Pregunta 4",
        answer: "Respuesta 4",
      };
      Question.find = jest.fn().mockResolvedValue(questions);

      await getAllQuestions(null, res);
      expect(Question.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenLastCalledWith({ questions });
    });
  });
});

describe("Given a getAQuestion controller", () => {
  describe("When it receives a response with an id in the params", () => {
    test("Then it should call method json of the received response", async () => {
      const req = {
        params: {
          _id: "7",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const question = [
        {
          _id: "7",
          question: "Pregunta 7",
          answer: "Respuesta 7",
        },
      ];

      Question.findById = jest.fn().mockResolvedValue(question);

      await getAQuestion(req, res);

      expect(Question.findById).toHaveBeenCalled();

      expect(res.json).toHaveBeenCalledWith(question);
    });
  });
});

describe("Given a addQuestion controller", () => {
  describe("When it receives a request", () => {
    test("Then it should call method json with a question in the response", async () => {
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
      const req = {
        body: {
          id: 1,
          question: "Pregunta 5",
          answer: "Respuesta 5",
        },
      };

      Question.create = jest.fn().mockResolvedValue(req.body);

      await addQuestion(req, res);

      expect(res.json).toHaveBeenCalledWith(req.body);
    });
  });
});

describe("Given a deleteQuestion controller", () => {
  describe("When it receives an existing id to delete", () => {
    test("Then it should call method json with an idQuestion in the response", async () => {
      const questionToDelete = {
        id: 6,
        question: "Pregunta 6",
        answer: "Respuesta 6",
        questionsLists: [],
      };
      const req = {
        params: {
          id: 6,
        },
      };

      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      const next = jest.fn();

      Question.findByIdAndDelete = jest
        .fn()
        .mockResolvedValue(questionToDelete);

      await deleteQuestion(req, res, next);

      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("When it receives an invalid id to delete", () => {
    test("Then it should call next with an error", async () => {
      const req = {
        params: {
          id: "wrongID",
        },
      };

      const next = jest.fn();
      const error = new Error("Question not found");

      Question.findByIdAndRemove = jest.fn().mockRejectedValue(error);

      await deleteQuestion(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a updateQuestion controller", () => {
  describe("When it receives an existing id to update", () => {
    test("Then it should call method json with an idQuestion in the response", async () => {
      const questionToUpdate = {
        id: 6,
        question: "Pregunta 6",
        answer: "Respuesta 6",
        questionsLists: [],
      };

      const req = {
        params: {
          id: 6,
        },
        body: {
          question: "Pregunta 5",
          answer: "Respuesta 5",
        },
      };

      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      const next = jest.fn();

      Question.findByIdAndUpdate = jest
        .fn()
        .mockResolvedValue(questionToUpdate);

      await updateQuestion(req, res, next);

      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("When it receives an invalid id to update", () => {
    test("Then it should call next with an error", async () => {
      const req = {
        params: {
          id: "wrongID",
        },
      };

      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      const next = jest.fn();
      const error = new Error("Question not found");

      Question.findByIdAndUpdate = jest.fn().mockRejectedValue(error);

      await updateQuestion(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
