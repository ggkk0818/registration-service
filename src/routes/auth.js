import express from "express";
import jwt from "jsonwebtoken";
import userDao from "../dao/admin.js";
import config from "../../config.js";
import { resSuccess, resError } from "../utils/utils.js";
import { sha1 } from "../utils/encrypt.js";
const router = express.Router();

router.post("/login", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    let user = await userDao.findByName(username);
    console.log(user);
    if (user == null) {
      // 用户不存在
      res.send(resError(null, 400, "用户名或密码错误"));
      return;
    }
    console.log(username, sha1(password), user);
    if (sha1(password) === user.password) {
      let result = jwt.sign(
        {
          id: user.id,
          username: user.name,
        },
        config.authSecretKey,
        {
          expiresIn: "10h",
        }
      );
      console.log("result", result);
      const { password: pwd, ...others } = user;
      res.send(
        resSuccess({ user: others, token: `Bearer ${result}` }, 200, "登录成功")
      );
    } else {
      // 密码错误
      res.send(resError(null, 400, "用户名或密码错误"));
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;
