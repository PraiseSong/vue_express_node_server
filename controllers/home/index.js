/**
 * Created by zhuqi on 10/14/16.
 */
var controller = {};

controller.init = function(req, res, next) {
    var data = { title: '欢迎您' };
    if(req.session.user){
        data.user = req.session.user;
        data.title = data.title+data.user;
        data.logout = '<a href="/logout.html">退出</a>';
    }else{
        data.login = '<a href="/login.html">登录</a>';
    }
    res.render('home', data);
};

module.exports = controller;
