import BaseDao from "./BaseDao.js";
import knex from "../utils/knex.js";

class ConfigDao extends BaseDao {
  constructor() {
    super("reg_config", {
      confCode: "conf_code",
      confValue: "conf_value",
    });
  }
  /**
   * 保存系统配置
   * @param {*} configList 
   * @returns 
   */
  saveConfig(configList) {
    return knex.transaction(async (trx) => {
      await trx(this.table).del()
      await trx.batchInsert(this.table, configList.map(item => {
        return { ...this.defaultValues, ...this.props2fields(item) };
      }), 100)
    });
  }

}
export default new ConfigDao();
