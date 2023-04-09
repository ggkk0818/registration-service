import BaseDao from "./BaseDao.js";
import knex from "../utils/knex.js";
class DoctorDao extends BaseDao {
  constructor() {
    super("reg_doctor", {
      id: "id",
      name: "name",
      password: "pwd",
      realName: "real_name",
      age: "age",
      gender: "gender",
      mobile: "mobile",
      description: "description",
      avatar: "avatar",
      deptId: "dept_id",
      isEnabled: "is_enabled",
      isDel: "is_del",
      createTime: "create_time",
      createUser: "create_user",
      updateTime: "update_time",
      updateUser: "update_user",
    }, {
      is_enabled: 1,
      is_del: 0
    });
  }

  // 分页查询
  async list(query, start = 0, limit = 10) {
    let list = await knex(this.table)
      .select(this.propsWithTable)
      .leftJoin('reg_department', 'reg_doctor.dept_id', 'reg_department.id')
      .select({ deptName: 'reg_department.name' })
      .where(this.props2fields(query, true))
      .whereNot("reg_doctor.is_del", "=", 1)
      .offset(start)
      .limit(limit);
    const total = await knex(this.table)
      .count("id as CNT")
      .where(this.props2fields(query))
      .whereNot("is_del", "=", 1);
    return {
      records: list,
      total: parseInt(total[0].CNT) || 0,
    };
  }

  async findByName(name) {
    const data = await this.list({ name });
    return data?.records?.[0];
  }
}
export default new DoctorDao();
