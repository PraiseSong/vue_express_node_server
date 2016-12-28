/**
 * Created by zhuqi on 10/14/16.
 */
var controller = {};
var httpUtil = require('../../utils/httpUtil')
var logUtil = require('../../utils/logUtil')

controller.init = function (req, res, next) {
    httpUtil.post('/api/login/submit', {
            username: 'qiakrtester'
        }).then(function (data){
            var data = {title: '洽客微商城Node服务', php: data.data.message};
            if (req.session.user) {
                data.user = req.session.user;
            }
            res.render('index', data);
        });


    //var a = require('./a.js').q_ausst,
    //    b = require('./b.js').q_aus_serv,
    //    fs = require('fs'),
    //    data = [];
    //
    //var b_r = {};
    //b.forEach(function (k, v){
    //    var id = k['V_IDENT'];
    //    var v = k['TEXT_1'];
    //    var type = k['SERVICE_ID'];
    //    b_r[id] = b_r[id] || {};
    //    if(type ==1){
    //        if(!b_r[id]['邮箱'] || b_r[id]['邮箱'].length <= 0){
    //            b_r[id]['邮箱'] = b_r[id]['邮箱'] && b_r[id]['邮箱'].length >= 1 ? b_r[id]['邮箱'] : v.indexOf('@') !== -1 ? v : "";
    //        }
    //    }
    //    if(type == 2){
    //        if(!b_r[id]['url'] || b_r[id]['url'].length <= 0){
    //            b_r[id]['url'] = b_r[id]['url'] && b_r[id]['url'].length >= 1 ? b_r[id]['url'] : (v.indexOf('@') < 0 && v.indexOf('jpg') < 0 && v.indexOf('jpeg') < 0 && v.indexOf('gif') < 0) && (v.indexOf('www.') !== -1 ||  v.indexOf('.com') !== -1 || v.indexOf('.cn') !== -1  || v.indexOf('.') !== -1) ? v : "";
    //        }
    //    }
    //    if(type == 3){
    //        b_r[id]['电话'] = b_r[id]['电话'] && b_r[id]['电话'].length >= 1 ? b_r[id]['电话'] : v.indexOf(' ') !== -1 ? "+"+v : "";
    //    }
    //    if(type == 4){
    //        b_r[id]['传真'] = b_r[id]['传真'] && b_r[id]['传真'].length >= 1 ? b_r[id]['传真'] : v.indexOf(' ') !== -1 ? "+"+v : "";
    //    }
    //})
    //a.forEach(function (k, v){
    //    var id = k['V_IDENT'];
    //    var s = {};
    //    s["ST_HALLE"] = k["ST_HALLE"];
    //    s["PRO_KEY"] = k["PRO_KEY"];
    //    s["V_COUNTRY"] = k["V_COUNTRY"];
    //    s["V_COUNTRY_EN"] = k["V_COUNTRY_EN"];
    //    s["V_COMPANY1"] = k["V_COMPANY1"];
    //    s["V_SORT"] = k["V_SORT"];
    //    s["PRO_SORT"] = k["PRO_SORT"];
    //    s["V_STREET1"] = k["V_STREET1"];
    //    for(d in b_r[id]){
    //        s[d] = b_r[id][d];
    //    }
    //    data.push(s);
    //})
    //
    //fs.writeFile("./data.json", JSON.stringify(data),function (err) {
    //    if (err) throw err ;
    //    console.log("File Saved !"); //文件被保存
    //}) ;

    //var template = require('art-template');
};

module.exports = controller;
