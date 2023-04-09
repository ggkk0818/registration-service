import Redlock from "redlock";
import redis from "../utils/redis.js";

const DOCTOR_KEY_PREFIX = "DOCTOR";
const RESOURCE_KEY_PREFIX = "RESOURCE";
const RESOURCECACHE_KEY_PREFIX = "RESOURCECACHE";
const redlock = new Redlock([redis], {
  retryDelay: 200, // time in ms
  retryCount: 5,
});

/**
 * 获取医生号源锁
 * @param {*} docId 医生ID
 * @returns 
 */
export function lockDoctorResource(docId) {
  return redlock.acquire([`${DOCTOR_KEY_PREFIX}_docId`], 3000);
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

export default {
  lockDoctorResource,
  addResourceCache,
  getResourceCache,
  removeResourceCache
}