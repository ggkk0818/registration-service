import express from "express";
import configDao from "../dao/config.js";
import { resSuccess } from "../utils/utils.js";
const router = express.Router();
// 查询配置列表
router.get("/", async (req, res, next) => {
  try {
    const data = await configDao.all();
    res.send(resSuccess(data));
  } catch (err) {
    next(err);
  }
});
// 保存配置
router.put("/", async (req, res, next) => {
  const params = req.body;
  try {
    await configDao.saveConfig(params.configList);
    res.send(resSuccess());
  } catch (err) {
    next(err);
  }
});
export default router;
