import BaseDao from "./BaseDao.js";

class AnnouncementDao extends BaseDao {
  constructor() {
    super("reg_announcement", {
      id: "id",
      type: "type",
      relateId: "relate_id",
      title: "title",
      content: "content",
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
}
export default new AnnouncementDao();
