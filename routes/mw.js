/**
 * Created by zhuqi on 10/11/16.
 */
var express = require('express');
var router = express.Router();
var logUtil = require('../utils/logUtil');
router.use(function timeLog(req, res, next) {
    var ua = req.header('user-agent');

    global.headers = req.headers;

    logUtil.log("\n"+'Time: '+Date.now());

    req.mobile = /mobile/i.test(ua);

    if(req.mobile){
        logUtil.log('来自移动端的请求');
    }else{
        logUtil.log('来自PC端的请求');
    }
    next();
});

module.exports = router;
