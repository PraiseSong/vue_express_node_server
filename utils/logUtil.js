/**
 * Created by zhuqi on 10/18/16.
 */
var winston = require('../logs_config');
var env = require("dotenvr").load();

module.exports =  {
    isDev : env.NODE_ENV === 'development'  ? true : false,
    /**
     * @description 任何环境都会输出
     * @param {String} message
     */
    echo:  function (message){
        console.log(message);
    },
    /**
     * @description 开发环境才会输出
     * @param {String} message
     */
    log: function (message){
        this.isDev && console.log(message);
    },
    /**
     * @description 线上环境才会写入日志
     * @param {String} message
     * @param {Object} [data]
     */
    info: function (message, data){
        data = data || {};
        !this.isDev && winston.info(message, data);
    },
    /**
     * @description 线上环境才会写入日志
     * @param {String} message
     * @param {Object} [data]
     */
    error: function (message, data){
        data = data || {};
        !this.isDev && winston.error(message, data);
    },
    /**
     * @description 线上环境才会写入日志
     * @param {String} message
     * @param {Object} [data]
     */
    warn: function (message, data){
        data = data || {};
        !this.isDev && winston.warn(message, data);
    }
};
