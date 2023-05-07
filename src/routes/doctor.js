import express from "express";
import moment from "moment";
import doctorDao from "../dao/doctor.js";
import scheduleDao from "../dao/schedule.js";
import userDao from "../dao/admin.js";
import appointmentService from "../services/appointment.js";
import { sha1 } from "../utils/encrypt.js";
import { resSuccess, generateId } from "../utils/utils.js";
const router = express.Router();
// 查询医生列表
router.get("/", async (req, res, next) => {
  const { pageNo, pageSize, ...query } = req.query;
  try {
    const data = await doctorDao.list(query, (pageNo - 1) * pageSize, pageSize);
    if (data?.records) {
      // 返回值去除密码字段
      data.records.forEach(item => {
        delete item.password;
      });
    }
    res.send(resSuccess(data));
  } catch (err) {
    next(err);
  }
});
// 查询医生号源列表
router.get("/resource", async (req, res, next) => {
  const { pageNo, pageSize, ...query } = req.query;
  const user = req.auth;
  try {
    // 关联查询当天号源
    const date = moment().startOf('day').toDate();
    const data = await appointmentService.queryDoctorResourceList(date, user, query, ((pageNo - 1) * pageSize) || 0, pageSize)
    if (data?.records) {
      // 返回值去除密码字段
      data.records.forEach(item => {
        delete item.password;
      });
    }
    res.send(resSuccess(data));
  } catch (err) {
    next(err);
  }
});
// 查询医生详情
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await doctorDao.findById(id);
    // 返回值去除密码字段
    if (data) {
      delete data.password;
      const scheduleList = await scheduleDao.listByDocId(data.id);
      data.scheduleList = scheduleList || [];
    }
    res.send(resSuccess(data));
  } catch (err) {
    next(err);
  }
});
// 新增医生
router.post("/", async (req, res, next) => {
  const params = req.body;
  const user = req.auth;
  try {
    // 密码加密
    if (params && params.password) {
      params.password = sha1(params.password)
    }
    // 保存医生信息
    const id = generateId();
    const data = await doctorDao.insert({
      ...params,
      id,
      createTime: new Date(),
      createUser: user.username,
      updateTime: new Date(),
      updateUser: user.username,
    });
    // 同步增加系统用户
    const docUser = await userDao.findByName(params.name);
    console.log("查找用户", params.name, docUser);
    if (docUser == null) {
      await userDao.insert({
        id,
        name: params.name,
        password: params.password,
        nickName: params.realName,
        email: "",
        mobile: params.mobile,
        roleId: "doctor",
        createTime: new Date(),
        createUser: user.username,
        updateTime: new Date(),
        updateUser: user.username,
      });
    }
    res.send(resSuccess(data));
  } catch (err) {
    next(err);
  }
});
// 编辑医生
router.put("/", async (req, res, next) => {
  const params = req.body;
  const user = req.auth;
  try {
    // 密码加密
    if (params && params.password) {
      params.password = sha1(params.password)
    }
    delete params.createTime
    delete params.createUser
    const data = await doctorDao.update(params.id, {
      ...params,
      updateTime: new Date(),
      updateUser: user.username,
    });
    res.send(resSuccess(data));
  } catch (err) {
    next(err);
  }
});
// 删除医生
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await doctorDao.delete(id);
    res.send(resSuccess());
  } catch (err) {
    next(err);
  }
});
// 编辑排班
router.put("/schedule", async (req, res, next) => {
  const params = req.body || {};
  const user = req.auth;
  try {
    const { docId, scheduleList } = params;
    await scheduleDao.deleteByDocId(docId);
    if (scheduleList && scheduleList.length > 0) {
      const now = new Date();
      const rows = scheduleList.map(item => ({
        docId,
        startTime: item.startTime,
        endTime: item.endTime,
        dayOfWeek: item.dayOfWeek,
        resourceCount: item.resourceCount,
        createTime: item.createTime || now,
        createUser: item.createUser || user.username,
        updateTime: now,
        updateUser: user.username,
      }));
      await scheduleDao.batchInsert(rows);
    }
    res.send(resSuccess());
  } catch (err) {
    next(err);
  }
});

export default router;
