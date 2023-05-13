import express from "express";
import statisticDao from "../dao/statistic.js";
import { resSuccess } from "../utils/utils.js";
import { USER_ROLE } from "../utils/consts.js";
const router = express.Router();
// 概览数据
router.get("/summary", async (req, res, next) => {
  const user = req.auth;
  try {
    const { date } = req.query;
    const data = await statisticDao.getDashboardStatistic(date, user?.roleId === USER_ROLE.DOCTOR ? user.id : undefined);
    res.send(resSuccess(data));
  } catch (err) {
    next(err);
  }
});
export default router;
