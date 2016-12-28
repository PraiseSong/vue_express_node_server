/**
 * Created by zhuqi on 10/18/16.
 */
var protocol = require('http');
var config = require("../config");
var logUtil = require('./logUtil');
var F = require('./FUtil');
var url = require('url');
var querystring = require('querystring')
var mime = require('mime');
var env = require("dotenvr").load();
var promise = require('promise');

var opt = {
    host: config.SERVICE.HOST,
    port: config.SERVICE.PORT
}

//https相关
var ca = null;
if(env.HTTPS == 1){
    protocol = require('https');
    var fs = require('fs');
    var path = require('path');
    ca = fs.readFileSync('./certificate.pem');
    opt.ca = ca;
    //开发环境，禁止证书检查
    if(env.NODE_ENV === 'development'){
        opt.rejectUnauthorized = false;
    }
}

module.exports = {
    /**
     * @description Client Post request
     * @param {String} api 接口路径
     * @param {Object} data 请求参数
     * @param {Object} [headers] 请求头信息。其中Content-Type和Content-Length会被覆盖为application/x-www-form-urlencoded
     * @param {Function} resolve的回调带有响应头headers和响应数据data两个参数，reject的回调带有error对象
     * @param {Object} promise
     */
    post: function (api, data, headers){
        return new promise(function (resolve, reject){
            opt.method = 'post';
            opt.path = api ? api : "";

            headers = headers || global.headers;
            data = data || {};
            headers['Content-Type'] = 'application/x-www-form-urlencoded';
            headers['Content-Length'] =  querystring.stringify(data).length;
            opt.headers = headers;

            logUtil.log("\n"+'POST Request: '+ JSON.stringify(opt))
            logUtil.log("\n"+'POST Request Data: '+ querystring.stringify(data))

            var resData = '';
            var req = protocol.request(opt, function (res){
                res.setEncoding('utf8');
                res.on('data',function(d){
                    resData += d;
                }).on('end', function(){
                    logUtil.log("\nPOST Response Headers: "+JSON.stringify(res.headers))
                    logUtil.log("\nPOST Response Data: "+resData);
                    var rd = JSON.parse(resData);
                    if(rd.code !== 0){
                        reject(rd);
                    }else{
                        resolve({
                            data: rd,
                            headers: res.headers
                        });
                    }
                });
            });

            req.on('error', function (e){
                logUtil.error('POST Request Error: '+e);
                logUtil.echo('POST Request Error: '+e);
                reject(e);
            });
            req.write(querystring.stringify(data));
            req.end();
        });
    },
    /**
     * @description Client Get request
     * @param {String} api 接口路径
     * @param {Object} data 请求参数
     * @param {Object} [headers] 请求头信息。其中Content-Type会被覆盖为application/json
     * @param {Function} resolve的回调带有响应头headers和响应数据data两个参数，reject的回调带有error对象
     * @param {Object} promise
     */
    get: function (api, data, headers){
        return new promise(function (resolve, reject){
            opt.method = 'get';
            opt.path = api ? api : "";

            var originData = data;
            headers = headers || global.headers;
            data = data || {};
            headers['Content-Type'] = mime.lookup('.json');
            opt.headers = headers;
            if(originData){
                opt.path += opt.path.indexOf('?') !== -1 ? F.json2querystring(data) : '?'+F.json2querystring(data);
            }

            var success = callbacks && callbacks.success ? callbacks.success : function (){};
            var fail = callbacks && callbacks.fail ? callbacks.fail : function (){};

            logUtil.log("\n"+'GET Request: '+ JSON.stringify(opt))
            logUtil.log("\n"+'GET Request Data: '+ JSON.stringify(data))

            var resData = '';
            var req = protocol.request(opt, function (res){
                res.setEncoding('utf8');
                res.on('data',function(d){
                    resData += d;
                }).on('end', function(){
                    logUtil.log("\nGET Response Headers: "+JSON.stringify(res.headers))
                    logUtil.log("\nGET Response Data: "+resData);
                    var rd = JSON.parse(resData);
                    if(rd.code !== 0){
                        reject(rd);
                    }else{
                        resolve({
                            data: rd,
                            headers: res.headers
                        });
                    }
                });
            });

            req.on('error', function (e){
                logUtil.error('GET Request Error: '+e);
                logUtil.echo('GET Request Error: '+e);
                reject(e);
            });
            req.end();
        });
    }
}