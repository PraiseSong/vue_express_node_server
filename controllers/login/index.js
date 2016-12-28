/**
 * Created by zhuqi on 10/14/16.
 */
var path = require('path');
var mime = require("mime");
var fs = require('fs');

var controller = {};

controller.init = function(req, res, next) {
    if(req.session.user_id){
        res.redirect("/home");
        return ;
    }

    var htmlPath = path.resolve(__dirname, '../../views/html/login.html');
    fs.readFile(htmlPath, function (err, data){
        res.writeHead(200, {
            "Content-Type": mime.lookup(htmlPath)
        });
        if(err){
            res.end(err);
        }else{
            res.end(data);
        }
    })
};
controller.submit = function(req, res, next) {
    if(!req.body.username){
        res.json({code: -1, message: "请填写用户名"});
        return;
    }
    if(req.session.user_id){
        res.json({code:-1, message: "当前已经登录了", data: {
            username: req.session.user_id
        }});
        return;
    }
    req.session.user_id = req.body.username;
    req.session.save();
    res.json({code:0, message: "登录成功"});
};

module.exports = controller;
