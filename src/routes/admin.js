import express from "express";
import userDao from "../dao/admin.js";
import { resSuccess } from "../utils/utils.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  const { start, limit, ...query } = req.query;
  try {
    const data = await userDao.list(query, start, limit);
    res.send(resSuccess(data));
  } catch (err) {
    next(err);
  }
});

export default router;
