import config from "../../config.js";
import Redis from "ioredis";
// 内存缓存
const memoryCache = {};
const memoryCacheManager = {
  get(key) {
    return memoryCache[key];
  },
  set(key, value) {
    memoryCache[key] = value;
  },
  del(key) {
    delete memoryCache[key];
  }
};
// 根据配置使用redis或内存缓存
export default config.redisEnabled ? new Redis(config.redis) : memoryCacheManager;