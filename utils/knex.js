// 引用配置文件
import configs from "../config.js";
import knex from "knex";
import logger from "../logger.js";
// 把配置文件中的信息，设置在初始化配置中
export default knex({
  client: "mysql2",
  connection: {
    host: configs.mysql.host,
    port: configs.mysql.port,
    user: configs.mysql.user,
    password: configs.mysql.password,
    database: configs.mysql.database,
  },
  // 打印错误
  log: {
    error(message) {
      logger.error("[knex error]", message);
    },
  },
});
