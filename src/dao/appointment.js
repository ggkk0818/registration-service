import BaseDao from "./BaseDao.js";
import knex from "../utils/knex.js";

class PatientDao extends BaseDao {
  constructor() {
    super("reg_appointment", {
      id: "id",
      docId: "doc_id",
      docScheduleId: "doc_schedule_id",
      patientId: "user_id",
      diagnoseTime: "diagnose_time",
      diagnoseResult: "diagnose_result",
      status: "status",
      createTime: "create_time",
      createUser: "create_user",
      updateTime: "update_time",
      updateUser: "update_user",
    });
  }

  // 分页查询
  async list(query, start = 0, limit = 10) {
    let list = await knex(this.table)
      .select(this.propsWithTable)
      .leftJoin('reg_doctor', 'reg_appointment.doc_id', 'reg_doctor.id')
      .select({ docName: 'reg_doctor.real_name' })
      .leftJoin('reg_department', 'reg_doctor.dept_id', 'reg_department.id')
      .select({ deptName: 'reg_department.name' })
      .leftJoin('reg_user', 'reg_appointment.user_id', 'reg_user.id')
      .select({ patientName: 'reg_user.real_name' })
      .where(this.props2fields(query, true))
      .offset(start)
      .limit(limit);
    const total = await knex(this.table)
      .count("id as CNT")
      .where(this.props2fields(query))
    return {
      records: list,
      total: parseInt(total[0].CNT) || 0,
    };
  }

  // 更新状态
  updateStatus(id, status) {
    return knex(this.table).where("id", "=", id).update({ status });
  }
}
export default new PatientDao();
