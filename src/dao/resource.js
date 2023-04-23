import BaseDao from "./BaseDao.js";
import knex from "../utils/knex.js";

class ResourceDao extends BaseDao {
  constructor() {
    super("reg_doctor_resource", {
      id: "id",
      scheduleDate: "schedule_date",
      docId: "doc_id",
      docScheduleId: "doc_schedule_id",
      startTime: "start_time",
      endTime: "end_time",
      resourceCount: "resource_count"
    });
  }

  /**
   * 删除数据并批量插入
   * @param {*} arr 
   * @returns 
   */
  saveResource(arr) {
    return knex.transaction(async (trx) => {
      await trx(this.table).del();
      await trx.batchInsert(this.table, arr.map(item => {
        return { ...this.defaultValues, ...this.props2fields(item) };
      }), 100);
    });
  }
}
export default new ResourceDao();
