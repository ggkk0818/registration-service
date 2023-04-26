import config from "../../config.js";
import Redis from "ioredis";

export default config.redisEnabled ? new Redis(config.redis) : {};