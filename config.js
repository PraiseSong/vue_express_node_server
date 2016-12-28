/**
 * Created by zhuqi on 10/13/16.
 */
var path = require('path');
var env = require("dotenvr").load();

module.exports = {
    REDIS: {
        HOST: "127.0.0.1",
        PORT: 6379,
        PASS: "",
        TTL: 1000*60,//1分钟
        SECRET: "qiakr"
    },
    SERVICE: {
        HOST: "api.qiakr.com",
        PORT: env.PORT
    },
    ACCESS_LOGS_DIR : path.join(__dirname, 'logs'),
    BIZ_LOGS_DIR: path.join(__dirname, '/logs/biz/'),
    SESSION_KEY: 'QIAKR_SESSION',
    COOKIE_SECRET: "COOKIE_SECRET",
    COOKIE_EXPIRES: 5 * 60 * 1000,//5分钟
    JWT_PRIVATE_KEY: "%$@dtee3%$#gdglk"
};