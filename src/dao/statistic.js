import BaseDao from "./BaseDao.js";
import knex from "../utils/knex.js";
import moment from "moment";

class StatisticDao extends BaseDao {
  constructor() {
    super();
  }

  async getDashboardStatistic(dateStr, docId) {
    const departmentRes = await knex("reg_department")
      .count("id as CNT")
      .whereNot("is_del", "=", 1);
    const doctorRes = await knex("reg_doctor")
      .count("id as CNT")
      .whereNot("is_del", "=", 1);
    const patientRes = await knex("reg_user")
      .count("id as CNT")
      .whereNot("is_del", "=", 1);
    let query = knex("reg_appointment")
      .count("id as CNT");
    if (dateStr) {
      const date = moment(dateStr);
      query = query.whereBetween("diagnose_time", [date.startOf("day").toDate(), date.endOf("day").toDate()]);
    }
    if (docId) {
      query = query.where("doc_id", docId);
    }
    const appointmentRes = await query;
    return {
      departmentCount: parseInt(departmentRes[0].CNT) || 0,
      doctorCount: parseInt(doctorRes[0].CNT) || 0,
      patientCount: parseInt(patientRes[0].CNT) || 0,
      appointmentCount: parseInt(appointmentRes[0].CNT) || 0,
    };
  }
}

export default new StatisticDao();