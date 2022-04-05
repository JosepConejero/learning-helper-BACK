require("dotenv").config();

const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const app = require("../index");

const Question = require("../../database/models/Question");
const connectToDataBase = require("../../database");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();
  await connectToDataBase(connectionString);
});

beforeEach(async () => {
  await Question.create({ question: "Pregunta 1", answer: "Respuesta 1" });
  await Question.create({ question: "Pregunta 2", answer: "Respuesta 2" });
});

afterEach(async () => {
  await Question.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("given an endpoint /question/", () => {
  describe("when it receives a request GET", () => {
    test("then it should response with status 200 and have 2 questions", async () => {
      const { body } = await request(app).get("/question").expect(200);

      expect(body).toHaveProperty("questions");
      expect(body.questions).toHaveLength(2);
      expect(body.questions[0].question).toBe("Pregunta 1");
    });
  });
});

describe("given a endpoint /question/", () => {
  describe("when it receives a request POST", () => {
    test("then it should response with status 200 and have 3 questions", async () => {
      const newQuestion = { question: "Pregunta 3", answer: "Respuesta 2" };

      const { body } = await request(app)
        .post("/question")
        .send(newQuestion)
        .expect(201);

      expect(body.question).toBe("Pregunta 3");
    });
  });
});
