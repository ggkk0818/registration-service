import BaseDao from "./BaseDao";

class AdminDao extends BaseDao {
  constructor() {
    super("reg_admin");
  }
}
export default new AdminDao();
