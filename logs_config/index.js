/**
 * Created by zhuqi on 10/12/16.
 */
var winston = require('winston');
var env = require("dotenvr").load();
var path = require('path');
var moment = require('moment');
var config = require('../config');

// biz log
var current = new Date(Date.now());
var date = current.getFullYear()+""+(current.getMonth()+1)+""+current.getDate();
var config = {
    timestamp: function() {
        var date = moment().format("YYYY/MM/DD HH:mm:ss");
        return date;
    },
    formatter: function(options) {
        // Return string will be passed to logger.
        var data = {
            DATE: options.timestamp(),
            LEVEL: options.level,
            MESSAGE: undefined !== options.message ? options.message : '',
            META: options.meta && Object.keys(options.meta).length ? options.meta : ''
        }
        return "\n"+JSON.stringify(data);
    },
    filename: path.join(config.BIZ_LOGS_DIR, env.NODE_ENV+'-biz-'+date+'.log'),
    json: false,
    level: 'silly',
    maxsize: 1024 * 1024 * 100,//100 MB
    maxFiles: 3000
};
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(config), // 控制台
        new (winston.transports.File)(config)
    ]
});

module.exports = logger;
