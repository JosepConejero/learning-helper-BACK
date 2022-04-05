const jwt = require("jsonwebtoken");
const auth = require("./auth");

jest.mock("jsonwebtoken");

describe("Given auth", () => {
  describe("When it's passed a request without authorization header", () => {
    test("Then it should call next with an error with message 'Token missing'", () => {
      const expectedError = new Error("Token missing");
      const req = {
        header: () => {},
      };
      const next = jest.fn();

      auth(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it's passed a request without a valid token", () => {
    test("Then it should call next with an error with message 'Invalid token'", () => {
      const expectedError = new Error("Wrong token");
      const req = {
        header: () => "Bearer invalidToken",
      };
      jwt.verify = jest.fn().mockImplementation(() => {
        throw new Error();
      });
      const next = jest.fn();

      auth(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it's passed a request without authorization header a valid token", () => {
    test("Then it should call next with an error with message 'Wrong token'", () => {
      const username = "asdas";
      const id = "asdasda";

      const req = {
        header: () => "Bearer validToken",
      };

      jwt.verify = jest.fn().mockReturnValue({ username, id });
      const next = jest.fn();

      auth(req, null, next);

      expect(next).toHaveBeenCalledWith();
    });
  });
});
