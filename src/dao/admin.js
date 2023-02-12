import BaseDao from "./BaseDao.js";

class AdminDao extends BaseDao {
  constructor() {
    super("reg_admin", {
      id: "id",
      name: "name",
      password: "password",
      isEnabled: "is_enabled",
      isDel: "is_del",
      updateTime: "update_time",
      updateUser: "update_user",
    });
  }

  async findByName(name) {
    const data = await this.list({ name });
    return data?.records?.[0];
  }
}
export default new AdminDao();
