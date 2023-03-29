import BaseDao from "./BaseDao.js";

class AdminDao extends BaseDao {
  constructor() {
    super("reg_admin", {
      id: "id",
      name: "name",
      password: "password",
      nickName: "nick_name",
      email: "email",
      mobile: "mobile",
      remark: "remark",
      roleId: "role_id",
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
