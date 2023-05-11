import Redlock from "redlock";
import moment from "moment";
import config from "../../config.js";
import redis from "../utils/redis.js";
import doctorDao from "../dao/doctor.js";
import scheduleDao from "../dao/schedule.js";
import resourceDao from "../dao/resource.js";
import stompService from "./stomp.js";
import logger from "../../logger.js";
import { STOMP_MESSAGE_TYPE } from "../utils/consts.js";
const DOCTOR_KEY_PREFIX = "DOCTOR";
const RESOURCE_KEY_PREFIX = "RESOURCE";
const RESOURCECACHE_KEY_PREFIX = "RESOURCECACHE";
// 临时内存锁
const lockMap = {};
const requireLock = (key, timeout = 3000) => {
  return new Promise((resolve, reject) => {
    const createLock = () => {
      let timer;
      const unlock = () => {
        clearTimeout(timer);
        delete lockMap[key];
      };
      // 超时自动解锁
      timer = setTimeout(unlock, timeout);
      lockMap[key] = { unlock };
      resolve(lockMap[key]);
    };
    if (!lockMap[key]) {
      createLock();
    } else {
      let retryTimes = 5;
      const timer = setInterval(() => {
        if (!lockMap[key]) {
          createLock();
          clearInterval(timer);
        } else {
          // 消耗重试次数
          retryTimes--;
          if (retryTimes <= 0) {
            reject();
            clearInterval(timer);
          }
        }
      }, 200);
    }
  });
};
// redis分布式锁
const redlock = config.redisEnabled ? new Redlock([redis], {
  retryDelay: 200, // time in ms
  retryCount: 5,
}) : { acquire: requireLock };

/**
 * 获取医生号源锁
 * @param {*} docId 医生ID
 * @returns 
 */
export function lockDoctorResource(docId) {
  return redlock.acquire([`${DOCTOR_KEY_PREFIX}_${docId}`], 3000);
}

/**
 * 增加锁定号源缓存
 * @param {*} row 
 * @returns 
 */
export async function addResourceCache(row) {
  if (!row) {
    throw new Error("预约记录不能为空");
  }
  const { docId, patientId } = row;
  const key = `${RESOURCECACHE_KEY_PREFIX}_${patientId}_${docId}`;
  return await redis.set(key, row);
}

/**
 * 获取锁定号源缓存
 * @param {*} docId 
 * @param {*} patientId 
 * @returns 
 */
export async function getResourceCache(docId, patientId) {
  const key = `${RESOURCECACHE_KEY_PREFIX}_${patientId}_${docId}`;
  return await redis.get(key);
}

/**
 * 删除锁定号源缓存
 * @param {*} docId 
 * @param {*} patientId 
 * @returns 
 */
export async function removeResourceCache(docId, patientId) {
  const key = `${RESOURCECACHE_KEY_PREFIX}_${patientId}_${docId}`;
  return await redis.del(key)
}

/**
 * 创建号源
 * @param {*} dateStr 
 */
export async function generateResource(dateStr) {
  const date = moment(dateStr);
  const dayOfWeek = date.isoWeekday();
  const scheduleDate = date.toDate();
  const scheduleList = await scheduleDao.all();
  const resourceList = (scheduleList || [])
    .filter(item => item.dayOfWeek === dayOfWeek)
    .map(item => {
      return {
        scheduleDate: scheduleDate,
        docId: item.docId,
        docScheduleId: item.id,
        startTime: item.startTime,
        endTime: item.endTime,
        resourceCount: item.resourceCount
      };
    });
  await resourceDao.saveResource(resourceList);
  logger.info(`已生成${resourceList.length}个号源`)
}

/**
 * 按日期查询医生号源列表
 * @param {Date} date 日期
 * @param {*} user 登录用户
 * @param {*} query 查询条件
 * @param {*} start 起始位置
 * @param {*} limit 每页条数
 */
export async function queryDoctorResourceList(date, user, query, start = 0, limit = 10) {
  console.log("按日期查询医生号源列表", date, user, query, start, limit);
  const doctorRes = await doctorDao.list(query, start, limit);
  console.log("医生列表", doctorRes);
  if (doctorRes?.records) {
    const resourceList = await resourceDao.allByDate(date);
    const isSame = (cache, resource) => {
      return cache.docScheduleId === resource.docScheduleId;
    };
    await doctorRes.records.reduce(async (prev, doctor) => {
      await prev
      const cache = await getResourceCache(doctor.id, user.id);
      console.log("医生缓存", doctor.realName, cache);
      // 缓存返回给前端用于接收websocket消息时判断实际号源数量
      doctor.cache = cache;
      doctor.diagnoseDate = date;
      doctor.resourceCount = cache ? 1 : 0;
      doctor.resourceList = resourceList.filter(item => item.docId === doctor.id).map(item => {
        doctor.resourceCount += item.resourceCount || 0;
        return {
          ...item,
          resourceCount: cache && isSame(cache, item) ? item.resourceCount + 1 : item.resourceCount
        };
      });
    }, undefined);
  }
  return doctorRes;
}
/**
 * 增量更新号源数量
 * @param {*} resourceId 号源id
 * @param {*} count 数量
 * @returns 
 */
export async function updateResourceCount(resourceId, count, user) {
  await resourceDao.updateResourceCount(resourceId, count);
  // 发送号源更新通知
  resourceDao.findById(resourceId).then(res => {
    stompService.publicResource(res, user);
  });
}

export default {
  lockDoctorResource,
  addResourceCache,
  getResourceCache,
  removeResourceCache,
  generateResource,
  queryDoctorResourceList,
  updateResourceCount
}