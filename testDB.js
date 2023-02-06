import knex from "./src/utils/knex.js";

class Base {
  constructor(props) {
    this.table = props;
  }

  // 查找
  all() {
    return knex(this.table).select();
  }

  // 新增
  insert(params) {
    return knex(this.table).insert(params);
  }

  // 更改
  update(id, params) {
    return knex(this.table).where("id", "=", id).update(params);
  }

  // 删除
  delete(id) {
    return knex(this.table).where("id", "=", id).del();
  }
}

class User extends Base {
  // 定义参数默认值为 user 表
  constructor(props = "reg_admin") {
    super(props);
  }
}

const user = new User();
user.all().then((data) => {
  console.log("user list", data);
});
