import express from "express";
import departmentDao from "../dao/department.js";
import { resSuccess } from "../utils/utils.js";
const router = express.Router();
// 查询科室列表
router.get("/", async (req, res, next) => {
  const { pageNo, pageSize, ...query } = req.query;
  try {
    const data = await departmentDao.list(query, (pageNo - 1) * pageSize, pageSize);
    res.send(resSuccess(data));
  } catch (err) {
    next(err);
  }
});
// 查询所有科室列表
router.get("/all", async (req, res, next) => {
  try {
    const data = await departmentDao.all();
    res.send(resSuccess(data));
  } catch (err) {
    next(err);
  }
});
// 查询科室详情
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await departmentDao.findById(id);
    res.send(resSuccess(data));
  } catch (err) {
    next(err);
  }
});
// 新增科室
router.post("/", async (req, res, next) => {
  const params = req.body;
  const user = req.auth;
  try {
    const data = await departmentDao.insert({
      ...params,
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
// 编辑科室
router.put("/", async (req, res, next) => {
  const params = req.body;
  const user = req.auth;
  try {
    delete params.createTime
    delete params.createUser
    const data = await departmentDao.update(params.id, {
      ...params,
      updateTime: new Date(),
      updateUser: user.username,
    });
    res.send(resSuccess(data));
  } catch (err) {
    next(err);
  }
});
// 删除科室
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await departmentDao.delete(id);
    res.send(resSuccess());
  } catch (err) {
    next(err);
  }
});
export default router;
