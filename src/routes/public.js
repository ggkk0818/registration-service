import express from "express";
import appointmentDao from "../dao/appointment.js";
import announcementDao from "../dao/announcement.js";
import departmentDao from "../dao/department.js";
import doctorDao from "../dao/doctor.js";
import { resSuccess } from "../utils/utils.js";
import { APPOINTMENT_STATUS, ANNOUNCEMENT_TYPE } from "../utils/consts.js";
const router = express.Router();
// 查询公告列表
router.get("/announcement", async (req, res, next) => {
  const { pageNo, pageSize, ...query } = req.query;
  try {
    const data = await announcementDao.list(query, (pageNo - 1) * pageSize, pageSize);
    if (data.records && data.records.length > 0) {
      // 获取科室与医生id集合
      const idMap = data.records.reduce((obj, item) => {
        if (item.type === ANNOUNCEMENT_TYPE.DEPARTMENT) {
          obj.deptIds.push(item.relateId);
        } else if (item.type === ANNOUNCEMENT_TYPE.DOCTOR) {
          obj.docIds.push(item.relateId);
        }
        return obj;
      }, { docIds: [], deptIds: [] });
      // 查询科室医生数据
      let docList = [];
      let deptList = [];
      if (idMap.deptIds.length > 0) {
        deptList = await departmentDao.findByIds(deptIds);
      }
      if (idMap.docIds.length > 0) {
        docList = await doctorDao.findByIds(docIds);
      }
      // 科室医生信息合并到公告列表中
      data.records.forEach(item => {
        if (item.type === ANNOUNCEMENT_TYPE.DEPARTMENT) {
          const dept = deptList.find(row => row.id === item.relateId);
          item.relateName = dept && dept.name || "";
        } else if (item.type === ANNOUNCEMENT_TYPE.DOCTOR) {
          const doc = docList.find(row => row.id === item.relateId);
          item.relateName = doc && doc.realName || "";
        }
      });
    }
    res.send(resSuccess(data));
  } catch (err) {
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