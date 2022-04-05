require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/User");
const { registerUser, loginUser } = require("./userController");

jest.mock("../../database/models/User");

describe("Given a registerUser controller", () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });
  describe("Whent it's called with a req and a user in the res", () => {
    test("Then it should call method status 201 and json", async () => {
      const expectedStatus = 201;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const next = jest.fn();

      const req = {
        body: { name: "josep", username: "josep", password: "josep" },
      };

      await registerUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("Whent it's called with a req a repeated username in the res", () => {
    test("Then it should call method status 401 and call next", async () => {
      const req = {
        body: { name: "josep", username: "josep", password: "josep" },
      };
      const next = jest.fn();

      const expectedError = new Error(
        `Username ${req.body.username} already exists`
      );

      User.findOne = jest.fn().mockResolvedValue(req.body.username);
      User.create = jest.fn().mockResolvedValue(req.body);
      await registerUser(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("Whent it's called with a req a empty username in the res", () => {
    test("Then it should call method status 401 and call next", async () => {
      const req = {
        body: { name: "roberto", username: "", password: "roberto" },
      };
      const next = jest.fn();

      const expectedError = new Error("User, Username or Password not found");

      User.findOne = jest.fn().mockResolvedValue(req.body.username);
      User.create = jest.fn().mockResolvedValue(req.body);
      await registerUser(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given a loginUser controller", () => {
  describe("When it receives a req with username and password", () => {
    test("Then it should call method status 200 and json", async () => {
      const password = "pasaporte";
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = {
        username: "Josep",
        password,
      };
      const userData = {
        username: "Josep",
        password: hashedPassword,
      };

      let token;
      User.findOne = jest.fn().mockResolvedValue(userData);
      jwt.sign = jest.fn().mockReturnValue(token);

      const req = {
        body: user,
      };

      const res = {
        json: jest.fn(),
      };

      const next = jest.fn();

      await loginUser(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ username: user.username });
      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });

  describe("When it receives a req with bad username", () => {
    test("Then it should call method status 400 and json", async () => {
      const user = {
        username: "",
      };

      const req = {
        body: user,
      };
      const next = jest.fn();
      const expectedError = new Error("User not found");

      User.findOne = jest.fn().mockResolvedValue(user.username);
      await loginUser(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
