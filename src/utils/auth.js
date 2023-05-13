// jwt.js,token中间件
import { expressjwt as jwt } from "express-jwt";
import config from "../../config.js";
// express-jwt中间件帮我们自动做了token的验证以及错误处理，所以一般情况下我们按照格式书写就没问题，其中unless放的就是你想要不检验token的api。
/**
 * 客户端请求携带token的机制为
 * header:{
 *  authorization: Bearer token-value
 *  （小写）authorization:Bearer+空格+token
 * }
 */
const jwtAuth = jwt({
  secret: config.authSecretKey,
  algorithms: ["HS256"],
}).unless({
  path: ["/auth/login", "/auth/logout", "/auth/register", "/auth/captcha"],
});

export default jwtAuth;
