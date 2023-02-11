import createError from "http-errors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import logger from "./logger.js";

import indexRouter from "./src/routes/index.js";
import usersRouter from "./src/routes/users.js";
import adminRouter from "./src/routes/admin.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);

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
    message: errorMsg,
    data: {},
  });
};
app.use(_errorHandler);

export default app;
