import express from "express";
import jwt from "jsonwebtoken";
import userDao from "../dao/admin.js";
import config from "../../config.js";
import { resSuccess, resError } from "../utils/utils.js";
import { sha1 } from "../utils/encrypt.js";
import svgCaptcha from "svg-captcha";
const router = express.Router();

router.post("/login", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    let user = await userDao.findByName(username);
    console.log(user.id.toString());
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

router.get("/info", async function (req, res, next) {
  try {
    const { id } = req.auth || {};
    let user = await userDao.findById(id);
    console.log(user);
    if (user == null) {
      // 用户不存在
      res.send(resError(null, 500, "用户未找到"));
      return;
    }
    const { password: pwd, ...others } = user;
    res.send(resSuccess(others, 200, "登录成功"));
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/logout", function (req, res, next) {
  res.send(resSuccess());
});

router.get("/captcha", function (req, res, next) {
  const captcha = svgCaptcha.create({
    size: 4,
    ignoreChars: "0o1iIl",
    noise: 3,
    color: true,
    background: "#fff",
    fontSize: 60,
  });
  console.log("captcha", captcha);
  res.type("svg");
  res.send(captcha.data);
});

router.get("/permmenu", function (req, res, next) {
  res.send(
    resSuccess({
      perms: [],
      menus: [],
    })
  );
});

export default router;
