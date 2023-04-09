import express from "express";
import patientDao from "../dao/patient.js";
import { resSuccess, generateId } from "../utils/utils.js";
const router = express.Router();
// 查询患者列表
router.get("/", async (req, res, next) => {
  const { pageNo, pageSize, ...query } = req.query;
  try {
    const data = await patientDao.list(query, (pageNo - 1) * pageSize, pageSize);
    res.send(resSuccess(data));
  } catch (err) {
    next(err);
  }
});
// 查询患者详情
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await patientDao.findById(id);
    res.send(resSuccess(data));
  } catch (err) {
    next(err);
  }
});
// 新增患者
router.post("/", async (req, res, next) => {
  const params = req.body;
  const user = req.auth;
  try {
    const id = generateId();
    const data = await patientDao.insert({
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
// 编辑患者
router.put("/", async (req, res, next) => {
  const params = req.body;
  const user = req.auth;
  try {
    delete params.createTime
    delete params.createUser
    const data = await patientDao.update(params.id, {
      ...params,
      updateTime: new Date(),
      updateUser: user.username,
    });
    res.send(resSuccess(data));
  } catch (err) {
    next(err);
  }
});
// 删除患者
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await patientDao.delete(id);
    res.send(resSuccess());
  } catch (err) {
    next(err);
  }
});
export default router;
