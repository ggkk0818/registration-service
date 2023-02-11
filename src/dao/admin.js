import BaseDao from "./BaseDao.js";

class AdminDao extends BaseDao {
  constructor() {
    super("reg_admin");
  }
}
export default new AdminDao();
