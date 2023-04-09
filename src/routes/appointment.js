import express from "express";
import appointmentDao from "../dao/appointment.js";
import appointmentService from "../services/appointment.js";
import { resSuccess, generateId } from "../utils/utils.js";
const router = express.Router();
// 查询预约列表
router.get("/", async (req, res, next) => {
  const { pageNo, pageSize, ...query } = req.query;
  try {
    const data = await appointmentDao.list(query, (pageNo - 1) * pageSize, pageSize);
    res.send(resSuccess(data));
  } catch (err) {
    next(err);
  }
});
// 查询预约详情
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await appointmentDao.findById(id);
    res.send(resSuccess(data));
  } catch (err) {
    next(err);
  }
});
// 新增预约
router.post("/", async (req, res, next) => {
  const params = req.body;
  const user = req.auth;
  try {
    const id = generateId();
    const data = await appointmentDao.insert({
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
// 编辑预约
router.put("/", async (req, res, next) => {
  const params = req.body;
  const user = req.auth;
  try {
    delete params.createTime
    delete params.createUser
    const data = await appointmentDao.update(params.id, {
      ...params,
      updateTime: new Date(),
      updateUser: user.username,
    });
    res.send(resSuccess(data));
  } catch (err) {
    next(err);
  }
});
// 删除预约
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await appointmentDao.delete(id);
    res.send(resSuccess());
  } catch (err) {
    next(err);
  }
});
// 准备预约
router.post("/prepare", async (req, res, next) => {
  const params = req.body;
  const user = req.auth;
  let lock = null;
  try {
    const { id: resourceId, docId, scheduleDate, docScheduleId, startTime, endTime } = params;
    const cache = appointmentService.getResourceCache(docId, user.id);
    // 有预约缓存，直接返回
    if (cache && cache.docScheduleId === docScheduleId) {
      res.send(resSuccess(data));
      return;
    }
    // 锁定医生号源
    lock = await appointmentService.lockDoctorResource(docId);
    // 先释放缓存的号源
    if (cache) {
      await appointmentService.updateResourceCount(cache.resourceId, 1);
    }
    // 创建号源缓存
    const row = {
      id: generateId(),
      resourceId,
      docId,
      docScheduleId,
      patientId: user.id,
      diagnoseTime: startTime,
      diagnoseResult: null,
      status: 0,
      createTime: new Date(),
      createUser: user.username,
      updateTime: new Date(),
      updateUser: user.username,
    };
    await appointmentService.addResourceCache(row);
    // 更新号源数量
    await appointmentService.updateResourceCount(resourceId, -1);
    // 解锁医生号源
    lock.unlock();
    // 返回号源信息
    res.send(resSuccess(row));
  } catch (err) {
    if (lock) {
      try {
        lock.unlock();
      } finally { }
    }
    next(err);
  }
});
export default router;
