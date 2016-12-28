/**
 * Created by zhuqi on 10/11/16.
 */
var express = require('express');
var router = express.Router();
var logUtil = require('../utils/logUtil');

router.use(function timeLog(req, res, next) {
    logUtil.log("jsapi_auth_mw");
    next();
});

module.exports = router;
