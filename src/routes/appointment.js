import express from "express";
import moment from "moment";
import appointmentDao from "../dao/appointment.js";
import resourceDao from "../dao/resource.js";
import appointmentService from "../services/appointment.js";
import { resSuccess, resError, generateId } from "../utils/utils.js";
import { APPOINTMENT_STATUS } from "../utils/consts.js";
const router = express.Router();
// 查询预约列表
router.get("/", async (req, res, next) => {
  const { pageNo, pageSize, ...query } = req.query;
  console.log("查询参数", query);
  try {
    const data = await appointmentDao.list(query, (pageNo - 1) * pageSize, pageSize);
    res.send(resSuccess(data));
  } catch (err) {
    next(err);
  }
});
// 患者查询我的预约列表
router.get("/my", async (req, res, next) => {
  const { pageNo, pageSize, ...query } = req.query;
  const user = req.auth;
  const patientQuery = {
    ...query,
    userId: user.id
  };
  console.log("查询参数", query, patientQuery);
  try {
    const data = await appointmentDao.list(patientQuery, (pageNo - 1) * pageSize, pageSize);
    res.send(resSuccess(data));
  } catch (err) {
    next(err);
  }
});
// 医生查询患者预约列表
router.get("/patient", async (req, res, next) => {
  const { pageNo, pageSize, ...query } = req.query;
  const user = req.auth;
  const patientQuery = {
    ...query,
    docId: user.id
  };
  console.log("查询参数", query, patientQuery);
  try {
    const data = await appointmentDao.list(patientQuery, (pageNo - 1) * pageSize, pageSize);
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
    await appointmentDao.updateStatus(id, APPOINTMENT_STATUS.CANCEL);
    res.send(resSuccess());
  } catch (err) {
    next(err);
  }
});
// 生成当天号源
router.post("/createResource", async (req, res, next) => {
  const user = req.auth;
  try {
    await appointmentService.generateResource(moment().format("YYYY-MM-DD"), user);
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
    const cache = await appointmentService.getResourceCache(docId, user.id);
    console.log("预约缓存", cache);
    // 有预约缓存，直接返回
    if (cache && cache.docScheduleId === docScheduleId) {
      res.send(resSuccess(cache));
      return;
    }
    // 锁定医生号源
    lock = await appointmentService.lockDoctorResource(docId);
    // 查询号源数量
    const resource = await resourceDao.findById(resourceId);
    if (!resource || resource.resourceCount < 1) {
      res.send(resError(null, 400, "号源不足，请预约其他时段。"));
      return;
    }
    // 先释放缓存的号源
    if (cache) {
      await appointmentService.updateResourceCount(cache.resourceId, 1);
    }
    // 创建号源缓存
    const diagnoseTime = moment(scheduleDate).startOf("day");
    const time = moment(startTime);
    diagnoseTime.add(moment.duration(time.format("HH:mm")));
    const row = {
      id: generateId(),
      resourceId,
      docId,
      docScheduleId,
      patientId: user.id,
      diagnoseTime: diagnoseTime.toDate(),
      diagnoseResult: null,
      status: APPOINTMENT_STATUS.LOCK,
      createTime: new Date(),
      createUser: user.username,
      updateTime: new Date(),
      updateUser: user.username,
    };
    await appointmentService.addResourceCache(row);
    // 更新号源数量
    console.log("prepare号源", row);
    await appointmentService.updateResourceCount(resourceId, -1);
    // 返回号源信息
    res.send(resSuccess(row));
  } catch (err) {
    console.log(err);
    next(err);
  } finally {
    if (lock) {
    // 解锁医生号源
    try {
        lock.unlock();
      } finally { }
    }
  }
});
// 预约挂号
router.post("/deal", async (req, res, next) => {
  const params = req.body;
  const user = req.auth;
  try {
    const { resourceId, docId, docScheduleId, createTime } = params;
    const cache = await appointmentService.getResourceCache(docId, user.id);
    const isExpire = !createTime || moment(createTime).add(15, 'minutes').isBefore(Date.now());
    console.log("预约挂号cache", cache, isExpire);
    // 判断号源过期或与缓存不符的情况
    if (!cache || cache.docScheduleId !== docScheduleId || isExpire) {
      res.send(resError(null, 400, "号源已失效，请重新预约。"));
      return;
    }
    // 更新号源状态
    cache.status = APPOINTMENT_STATUS.RESERVED
    cache.updateTime = new Date()
    // 保存号源
    const data = await appointmentDao.insert(cache);
    // 清除缓存
    await appointmentService.removeResourceCache(docId, user.id);
    res.send(resSuccess(data));
  } catch(err) {
    next(err);
  }
});
// 患者候诊
router.post("/checkin", async (req, res, next) => {
  const params = req.body;
  const user = req.auth;
  try {
    const { id } = params;
    // 更新号源状态
    const data = await appointmentDao.updateStatus(id, APPOINTMENT_STATUS.DIAGNOSE_HOLD, user.username);
    res.send(resSuccess(data));
  } catch(err) {
    next(err);
  }
});
export default router;
