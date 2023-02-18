import express from "express";
import userDao from "../dao/admin.js";
import { resSuccess } from "../utils/utils.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  const { pageNo, pageSize, ...query } = req.query;
  try {
    const data = await userDao.list(query, (pageNo - 1) * pageSize, pageSize);
    res.send(resSuccess(data));
  } catch (err) {
    next(err);
  }
});

export default router;
