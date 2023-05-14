export default {
  mysql: {
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    password: "123456", // 自己设置的密码
    database: "registration", // 数据库的名字
  },
  // redis配置
  redisEnabled: false,
  redis: {
    host: "127.0.0.1",
    port: "6379"
  },
  // stomp配置
  stompEnabled: true,
  stomp: {
    brokerURL: 'ws://localhost:15674/ws',
    connectHeaders: {
      login: 'admin',
      passcode: 'admin',
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000
  },
  // JWT密钥
  authSecretKey: 'P^hR5@9b8A4HrK&pM@'
};
