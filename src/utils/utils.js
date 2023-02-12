/**
 * 封装响应成功返回值
 * @param {*} data
 * @param {*} code
 * @param {*} message
 * @returns
 */
export function resSuccess(data, code = 200, message = "操作成功") {
  return { data, code, message };
}
/**
 * 封装响应错误返回值
 * @param {*} data
 * @param {*} code
 * @param {*} message
 * @returns
 */
export function resError(
  data,
  code = 500,
  message = "服务器开小差了，稍后再试吧"
) {
  return { data, code, message };
}
