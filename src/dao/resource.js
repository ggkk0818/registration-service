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

  // 根据id查询
  findById(id) {
    return knex(this.table)
      .select(this.props)
      .where("id", "=", id)
      .first();
  }

  /**
   * 按日期查询所有号源
   * @returns 
   */
  allByDate(date) {
    let query = knex(this.table).select(this.props).where("schedule_date", "=", date);
    return query;
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
  /**
   * 增量更新号源数量
   * @param {*} id 号源id
   * @param {*} additionalCount 添加或减少的数量
   * @returns 
   */
  updateResourceCount(id, additionalCount) {
    console.log("updateResourceCount", id, additionalCount);
    console.log("set resource_count = resource_count" + (additionalCount >= 0 ? "+" : "") + additionalCount);
    return knex(this.table).update({
      resource_count: knex.raw('??' + (additionalCount >= 0 ? "+" : "") + additionalCount, ['resource_count'])
    }).where("id", "=", id);
  }
}
export default new ResourceDao();
