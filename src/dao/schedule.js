import BaseDao from "./BaseDao.js";

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
}
export default new PatientDao();
