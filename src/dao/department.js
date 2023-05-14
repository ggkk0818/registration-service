import BaseDao from "./BaseDao.js";

class DepartmentDao extends BaseDao {
  constructor() {
    super("reg_department", {
      id: "id",
      name: "name",
      description: "description",
      parentId: "parent_id",
      isDel: "is_del",
      createTime: "create_time",
      createUser: "create_user",
      updateTime: "update_time",
      updateUser: "update_user",
    }, {
      is_del: 0
    });
  }
}
export default new DepartmentDao();
