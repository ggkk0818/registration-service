import express from "express";
import userDao from "../dao/admin.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  const list = await userDao.all();
  res.send({
    code: 200,
    message: "查询成功",
    data: list,
  });
});

export default router;
