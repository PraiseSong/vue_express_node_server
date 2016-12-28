/**
 * Created by zhuqi on 10/14/16.
 */
var path = require('path');
var mime = require("mime");
var fs = require('fs');

var controller = {};

controller.init = function(req, res, next) {
    if(!req.session.user){
        res.redirect("/user.html");
        return ;
    }
    var htmlPath = path.resolve(__dirname, '../../views/html/user.html');
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

module.exports = controller;
