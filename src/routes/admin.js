import express from "express";
import userDao from "../dao/admin.js";
import { resSuccess, generateId } from "../utils/utils.js";
const router = express.Router();
// 查询用户列表
router.get("/", async (req, res, next) => {
  const { pageNo, pageSize, ...query } = req.query;
  try {
    const data = await userDao.list(query, (pageNo - 1) * pageSize, pageSize);
    res.send(resSuccess(data));
  } catch (err) {
    next(err);
  }
});
// 查询用户详情
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await userDao.findById(id);
    res.send(resSuccess(data));
  } catch (err) {
    next(err);
  }
});
// 新增用户
router.post("/", async (req, res, next) => {
  const params = req.body;
  const user = req.auth;
  try {
    const id = generateId();
    const data = await userDao.insert({
      ...params,
      id,
      createTime: new Date(),
      createUser: user.username,
      updateTime: new Date(),
      updateUser: user.username,
    });
    res.send(resSuccess(data));
  } catch (err) {
    next(err);
  }
});
// 编辑用户
router.put("/", async (req, res, next) => {
  const params = req.body;
  const user = req.auth;
  try {
    delete params.createTime
    delete params.createUser
    const data = await userDao.update(params.id, {
      ...params,
      updateTime: new Date(),
      updateUser: user.username,
    });
    res.send(resSuccess(data));
  } catch (err) {
    next(err);
  }
});
// 删除用户
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await userDao.delete(id);
    res.send(resSuccess());
  } catch (err) {
    next(err);
  }
});
export default router;
