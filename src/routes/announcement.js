import express from "express";
import announcementDao from "../dao/announcement.js";
import departmentDao from "../dao/department.js";
import doctorDao from "../dao/doctor.js";
import { resSuccess } from "../utils/utils.js";
import { ANNOUNCEMENT_TYPE } from "../utils/consts.js";
const router = express.Router();
// 查询公告列表
router.get("/", async (req, res, next) => {
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
