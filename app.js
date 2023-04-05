import createError from "http-errors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import history from "connect-history-api-fallback";
import morgan from "morgan";
import logger from "./logger.js";
import { resError } from "./src/utils/utils.js";
import jwtAuth from "./src/utils/auth.js";
import authRouter from "./src/routes/auth.js";
import doctorRouter from "./src/routes/doctor.js";
import adminRouter from "./src/routes/admin.js";
import departmentRouter from "./src/routes/department.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/auth", jwtAuth);
app.use("/auth", authRouter);
app.use("/admin", jwtAuth);
app.use("/admin", adminRouter);
app.use("/department", jwtAuth);
app.use("/department", departmentRouter);
app.use("/doctor", jwtAuth);
app.use("/doctor", doctorRouter);
// 支持history模式
// app.use(
//   history({
//     index: "/",
//     disableDotRule: true,
//     verbose: true,
//     logger: logger.debug,
//   })
// );
app.use(
  express.static(path.join(__dirname, "public"), { index: "index.html" })
);
//  捕捉404错误 catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// 处理非404的错误（throw 出来的错误)
const _errorHandler = (err, req, res, next) => {
  logger.error(`${req.method} ${req.originalUrl} ` + err.message);
  switch (err && err.name) {
    case "UnauthorizedError":
      res.send(resError(null, 11001, "登录失效，请重新登录。"));
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
