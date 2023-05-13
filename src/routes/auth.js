import express from "express";
import jwt from "jsonwebtoken";
import userDao from "../dao/admin.js";
import patientDao from "../dao/patient.js";
import config from "../../config.js";
import { resSuccess, resError, generateId } from "../utils/utils.js";
import { USER_ROLE } from "../utils/consts.js";
import { sha1 } from "../utils/encrypt.js";
import svgCaptcha from "svg-captcha";
const router = express.Router();
// 登录类型
const LOGIN_TYPE = {
  PATIENT: 1, // 患者
  ADMIN: 2 // 管理员&医生
};

router.post("/login", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const loginType = req.body && req.body.loginType || LOGIN_TYPE.PATIENT;
    let user = null;
    if (loginType === LOGIN_TYPE.ADMIN) {
      // 查系统用户表（管理员、医生）
      user = await userDao.findByName(username);
    } else {
      // 查患者表
      user = await patientDao.findByName(username);
    }
    if (user == null) {
      // 用户不存在
      res.send(resError(null, 400, "用户名或密码错误"));
      return;
    } else if (loginType !== LOGIN_TYPE.ADMIN) {
      user.roleId = USER_ROLE.PATIENT
    }
    console.log(username, sha1(password), user);
    if (sha1(password) === user.password) {
      let result = jwt.sign(
        {
          id: user.id,
          username: user.name,
          roleId: loginType === LOGIN_TYPE.ADMIN ? user.roleId : USER_ROLE.PATIENT
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
    const { id, roleId } = req.auth || {};
    let user = null;
    if (roleId === USER_ROLE.ADMIN || roleId === USER_ROLE.DOCTOR) {
      // 查系统用户表（管理员、医生）
      user = await userDao.findById(id);
    } else {
      // 查患者表
      user = await patientDao.findById(id);
    }
    console.log(user);
    if (user == null) {
      // 用户不存在
      res.send(resError(null, 500, "用户未找到"));
      return;
    }
    user.nickName = user.nickName || user.realName
    user.roleId = roleId
    const { password: pwd, ...others } = user;
    res.send(resSuccess(others, 200, "登录成功"));
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  const params = req.body;
  const user = req.auth;
  try {
    // 用户名校验
    const name = params?.name;
    if (!name || String(name).replace(/ /g, "").length === 0) {
      res.send(resError(null, 400, "请填写用户名"));
      return;
    }
    const existsUser = await patientDao.findByName(name);
    if (existsUser) {
      res.send(resError(null, 400, "用户名已存在"));
      return;
    }
    // 密码加密
    if (params && params.password) {
      params.password = sha1(params.password)
    }
    const id = generateId();
    const data = await patientDao.insert({
      ...params,
      id,
      createTime: new Date(),
      createUser: "system",
      updateTime: new Date(),
      updateUser: "system",
    });
    res.send(resSuccess(data));
  } catch (err) {
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
