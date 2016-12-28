/**
 * Created by zhuqi on 10/11/16.
 */
var express = require('express');
var router = express.Router();
var glob = require('glob');
var path = require('path');

function getHTML(htmlPath) {
    glob.sync(htmlPath).forEach(function (hp) {
        var basename = path.basename(hp, path.extname(hp));console.log(basename)
        router.get('/'+basename+".html", require('../controllers/'+basename)['init']);
    });
}
getHTML(path.resolve(__dirname, './../views/html/*.html'));

module.exports = router;
