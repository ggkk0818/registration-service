// 公告类型
export const ANNOUNCEMENT_TYPE = {
  SYSTEM: 1, // 系统
  DEPARTMENT: 2, // 科室
  DOCTOR: 3 // 医生
};
// 用户角色
export const USER_ROLE = {
  PATIENT: "patient", // 患者
  DOCTOR: "doctor", // 医生
  ADMIN: "admin" // 管理员
};
// 号源状态
export const APPOINTMENT_STATUS = {
  LOCK: 0, // 锁定号源
  RESERVED: 1, // 预约成功
  DIAGNOSE_HOLD: 2, // 候诊
  DIAGNOSE_DONE: 3 // 诊断完成
};