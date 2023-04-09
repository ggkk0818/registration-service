import configs from "../../config.js";
import Redis from "ioredis";

export default new Redis(configs.redis);