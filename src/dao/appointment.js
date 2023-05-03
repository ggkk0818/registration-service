import BaseDao from "./BaseDao.js";
import knex from "../utils/knex.js";

class AppointmentDao extends BaseDao {
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
    const { docName, deptId, patientName, paatientMobile, ...others } = query || {};
    const whereQuery = this.props2fields(others, true);
    if (docName) {
      whereQuery["reg_doctor.real_name"] = docName;
    }
    if (deptId != null) {
      whereQuery["reg_appointment.doc_id"] = deptId;
    }
    if (patientName) {
      whereQuery["reg_user.real_name"] = patientName;
    }
    if (paatientMobile) {
      whereQuery["reg_user.mobile"] = paatientMobile;
    }
    console.log("分页查询", whereQuery);
    let list = await knex(this.table)
      .select(this.propsWithTable)
      .leftJoin('reg_doctor', 'reg_appointment.doc_id', 'reg_doctor.id')
      .select({ docName: 'reg_doctor.real_name' })
      .leftJoin('reg_department', 'reg_doctor.dept_id', 'reg_department.id')
      .select({ deptName: 'reg_department.name' })
      .leftJoin('reg_user', 'reg_appointment.user_id', 'reg_user.id')
      .select({ patientName: 'reg_user.real_name', patientMobile: 'reg_user.mobile' })
      .where(whereQuery)
      .orderBy("reg_appointment.update_time", "desc")
      .offset(start)
      .limit(limit);
    const total = await knex(this.table)
      .count("reg_appointment.id as CNT")
      .leftJoin('reg_doctor', 'reg_appointment.doc_id', 'reg_doctor.id')
      .leftJoin('reg_department', 'reg_doctor.dept_id', 'reg_department.id')
      .leftJoin('reg_user', 'reg_appointment.user_id', 'reg_user.id')
      .where(whereQuery);
    return {
      records: list,
      total: parseInt(total[0].CNT) || 0,
    };
  }

  // 根据id查询
  findById(id) {
    return knex(this.table)
      .select(this.propsWithTable)
      .leftJoin('reg_doctor', 'reg_appointment.doc_id', 'reg_doctor.id')
      .select({ docName: 'reg_doctor.real_name' })
      .leftJoin('reg_department', 'reg_doctor.dept_id', 'reg_department.id')
      .select({ deptName: 'reg_department.name' })
      .leftJoin('reg_user', 'reg_appointment.user_id', 'reg_user.id')
      .select({ patientName: 'reg_user.real_name', patientMobile: 'reg_user.mobile' })
      .where("reg_appointment.id", "=", id)
      .first();
  }

  // 更新状态
  updateStatus(id, status, updateUser) {
    return knex(this.table).where("id", "=", id).update({ status, update_time: new Date(), update_user: updateUser });
  }
}
export default new AppointmentDao();
