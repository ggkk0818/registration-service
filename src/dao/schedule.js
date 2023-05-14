import BaseDao from "./BaseDao.js";
import knex from "../utils/knex.js";
class PatientDao extends BaseDao {
  constructor() {
    super("reg_doctor_schedule", {
      id: "id",
      docId: "doc_id",
      startTime: "start_time",
      endTime: "end_time",
      dayOfWeek: "day_of_week",
      resourceCount: "resource_count",
      createTime: "create_time",
      createUser: "create_user",
      updateTime: "update_time",
      updateUser: "update_user",
    });
  }

  // 查询医生所有排班
  listByDocId(docId) {
    return knex(this.table).select(this.props).where("doc_id", "=", docId);
  }

  // 删除医生下所有排班
  deleteByDocId(docId) {
    return knex(this.table).where("doc_id", "=", docId).del();
  }
}
export default new PatientDao();
