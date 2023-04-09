import BaseDao from "./BaseDao.js";

class PatientDao extends BaseDao {
  constructor() {
    super("reg_doctor_resource", {
      id: "id",
      scheduleDate: "schedule_date",
      docId: "doc_id",
      docScheduleId: "doc_schedule_id",
      resourceCount: "resource_count"
    });
  }
}
export default new PatientDao();
