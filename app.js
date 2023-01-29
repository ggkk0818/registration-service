import createError from "http-errors";
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const logger = require("./logger");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

//  捕捉404错误 catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// 处理非404的错误（throw 出来的错误)
const _errorHandler = (err, req, res, next) => {
  logger.error(`${req.method} ${req.originalUrl} ` + err.message);
  const errorMsg = err.message;
  res.status(err.status || 500).json({
    code: -1,
    success: false,
    message: errorMsg,
    data: {},
  });
};
app.use(_errorHandler);

export default app;
