require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const questionRouter = require("./routers/questionRouter");
const questionsListRouter = require("./routers/questionsListRouter");
const { notFoundError, generalError } = require("./middlewares/errors");
const userRouter = require("./routers/userRouter");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());

app.use("/user", userRouter);
app.use("/question", questionRouter);
app.use("/questionslist", questionsListRouter);

app.use(notFoundError);
app.use(generalError);

module.exports = app;
