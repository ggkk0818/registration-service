import express from "express";
import announcementDao from "../dao/announcement.js";
import { resSuccess } from "../utils/utils.js";
const router = express.Router();
// 查询公告列表
router.get("/", async (req, res, next) => {
  const { pageNo, pageSize, ...query } = req.query;
  try {
    const data = await announcementDao.list(query, (pageNo - 1) * pageSize, pageSize);
    res.send(resSuccess(data));
  } catch (err) {
    next(err);
  }
});
// 查询公告详情
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await announcementDao.findById(id);
    res.send(resSuccess(data));
  } catch (err) {
    next(err);
  }
});
// 新增公告
router.post("/", async (req, res, next) => {
  const params = req.body;
  const user = req.auth;
  try {
    const data = await announcementDao.insert({
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
// 编辑公告
router.put("/", async (req, res, next) => {
  const params = req.body;
  const user = req.auth;
  try {
    delete params.createTime
    delete params.createUser
    const data = await announcementDao.update(params.id, {
      ...params,
      updateTime: new Date(),
      updateUser: user.username,
    });
    res.send(resSuccess(data));
  } catch (err) {
    next(err);
  }
});
// 删除公告
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await announcementDao.delete(id);
    res.send(resSuccess());
  } catch (err) {
    next(err);
  }
});
export default router;
