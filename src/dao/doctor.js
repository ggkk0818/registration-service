import BaseDao from "./BaseDao.js";

class AdminDao extends BaseDao {
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

  async findByName(name) {
    const data = await this.list({ name });
    return data?.records?.[0];
  }
}
export default new AdminDao();
