import createError from "http-errors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import history from "connect-history-api-fallback";
import morgan from "morgan";
import logger from "./logger.js";
import jwtAuth from "./src/utils/auth.js";
import indexRouter from "./src/routes/index.js";
import authRouter from "./src/routes/auth.js";
import usersRouter from "./src/routes/users.js";
import adminRouter from "./src/routes/admin.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 支持history模式
app.use(
  history({
    index: '/',
    disableDotRule: true,
    verbose: true,
    logger: logger.debug
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use(jwtAuth);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/admin", adminRouter);

//  捕捉404错误 catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// 处理非404的错误（throw 出来的错误)
const _errorHandler = (err, req, res, next) => {
  logger.error(`${req.method} ${req.originalUrl} ` + err.message);
  switch (err && err.name) {
    case "UnauthorizedError":
      res.status(401).json({
        code: 401,
        message: "invalid token",
        data: null,
      });
      break;
    default:
      const errorMsg = err.message;
      res.status(err.status || 500).json({
        code: 500,
        message: errorMsg,
        data: null,
      });
      break;
  }
};
app.use(_errorHandler);

export default app;
