const QuestionsList = require("../../database/models/QuestionsList");
const {
  getAllQuestionsLists,
  getAQuestionsList,
  addQuestionsList,
  deleteQuestionsList,
} = require("./questionsListController");

jest.mock("../../database/models/QuestionsList");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Given a getAllQuestionsLists controller", () => {
  describe("When it receives a GET request", () => {
    test("Then it should call method json with a list of questionsLists in the response", async () => {
      const res = { json: jest.fn() };

      const questionsLists = {
        id: 1,
        name: "Nombre 4",
        subject: "Materia 4",
      };
      QuestionsList.find = jest.fn().mockResolvedValue(questionsLists);

      await getAllQuestionsLists(null, res);
      expect(QuestionsList.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenLastCalledWith({ questionsLists });
    });
  });
});

describe("Given a getAQuestionsList controller", () => {
  describe("When it receives a response with an id in the params", () => {
    test("Then it should call method json of the received response", async () => {
      const req = {
        params: {
          _id: "7",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(), // perquè n'hi ha coses encadenades
        json: jest.fn(),
      };
      const questionsList = [
        {
          _id: "7",
          name: "Nombre 7",
          subject: "Materia 7",
        },
      ];

      QuestionsList.findById = jest.fn().mockResolvedValue(questionsList); // mockRejectedValue()

      await getAQuestionsList(req, res);

      expect(QuestionsList.findById).toHaveBeenCalled();

      expect(res.json).toHaveBeenCalledWith(questionsList);
    });
  });
});

describe("Given a addQuestionsList controller", () => {
  describe("When it receives a request", () => {
    test("Then it should call method json with a questionsList in the response", async () => {
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
      const req = {
        body: {
          id: 1,
          name: "Nombre 5",
          subject: "Materia 5",
        },
      };

      QuestionsList.create = jest.fn().mockResolvedValue(req.body);

      await addQuestionsList(req, res);

      expect(res.json).toHaveBeenCalledWith(req.body);
    });
  });
});

describe("Given a deleteQuestionsList controller", () => {
  describe("When it receives an existing id to delete", () => {
    test("Then it should call method json with an idQuestionsList in the response", async () => {
      const questionsListToDelete = {
        id: 6,
        name: "Nombre 6",
        subject: "Materia 6",
        questions: [],
      };
      const req = {
        params: {
          id: 6,
        },
      };

      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      const next = jest.fn();

      QuestionsList.findByIdAndDelete = jest
        .fn()
        .mockResolvedValue(questionsListToDelete);

      await deleteQuestionsList(req, res, next);

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
      const error = new Error("Questions List not found");

      QuestionsList.findByIdAndRemove = jest.fn().mockRejectedValue(error);

      await deleteQuestionsList(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
