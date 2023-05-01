import knex from "../utils/knex.js";
/**
 * 基础数据访问类
 */
class BaseDao {
  /**
   * 构造方法
   * @param {*} tableName 表名
   * @param {*} props 字段映射
   * @param {*} defaultValues 数据表默认值
   */
  constructor(tableName, props, defaultValues) {
    this.table = tableName;
    this.props = props;
    this.propsWithTable = props ? Object.entries(props).map(([key, val]) => [key, `${tableName}.${val}`]).reduce((obj, [key, val]) => {
      obj[key] = val;
      return obj;
    }, {}) : undefined;
    this.defaultValues = defaultValues;
  }

  // 全量查询
  all() {
    let query = knex(this.table).select(this.props);
    if (this.props && Object.values(this.props).includes("is_del")) {
      query = query.whereNot("is_del", "=", 1);
    }
    return query;
  }

  // 分页查询
  async list(query, start = 0, limit = 10) {
    let list = await knex(this.table)
      .select(this.props)
      .where(this.props2fields(query))
      .whereNot("is_del", "=", 1)
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

  // 根据id查询
  findById(id) {
    return knex(this.table)
      .select(this.props)
      .where("id", "=", id)
      .whereNot("is_del", "=", 1)
      .first();
  }

  // 根据id数组查询
  findByIds(ids) {
    return knex(this.table)
      .select(this.props)
      .whereIn("id", ids)
      .whereNot("is_del", "=", 1);
  }

  // 新增
  insert(params) {
    return knex(this.table).insert({ ...this.defaultValues, ...this.props2fields(params) }, "id");
  }

  // 批量新增
  batchInsert(arr) {
    return knex.batchInsert(this.table, arr.map(item => {
      return { ...this.defaultValues, ...this.props2fields(item) };
    }), 100).returning('id')
  }

  // 更改
  update(id, params) {
    return knex(this.table)
      .where("id", "=", id)
      .update(this.props2fields(params));
  }

  // 删除
  delete(id) {
    return knex(this.table).where("id", "=", id).update({ is_del: 1 });
  }
  /**
   * 将实体类对象转为数据库字段对象
   * @param {*} obj 实体类对象
   * @param {Boolean} withTable 字段名是否带表名
   * @returns {Object} 数据库字段对象
   */
  props2fields(obj, withTable = false) {
    let val = {};
    if (this.props != null) {
      Object.entries(this.props).forEach(([key, field]) => {
        if (obj[key] !== undefined) {
          val[withTable ? `${this.table}.${field}` : field] = obj[key];
        }
      });
    }
    return val;
  }
  fileds2props(obj) {
    let val = {
      ...this.defaultValues,
      ...obj,
    };
    if (this.props != null) {
      Object.entries(this.props).forEach(([key, field]) => {
        if (obj[field] !== undefined) {
          val[key] = obj[field];
          // 删除数据库字段
          delete val[field];
        }
      });
    }
    return val;
  }
}
export default BaseDao;
