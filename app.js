var config = require('./config');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var env = require("dotenvr").load();
var fs = require('fs');
var template = require('art-template');
var glob = require('glob');
var fileStreamRotator = require('file-stream-rotator');
var mime = require("mime");
var redis = require('./utils/redisUtil');
var logUtil = require('./utils/logUtil');
var useragent = require('express-mobile-agent');



var app = express();

// session cookie
app.use(redis.init());
app.use(cookieParser(config.REDIS.COOKIE_SECRET));

//ua
app.use(useragent);

// view engine setup
template.config('views', path.join(__dirname, 'views'));
template.config('extname', '.html');
app.engine('.html', template.__express);
app.set('view engine', 'html');

// access log
if(env.NODE_ENV !== 'production'){
  app.use(logger('combined', {stream: process.stdout}));
}else{
  // ensure log directory exists
  fs.existsSync(config.ACCESS_LOGS_DIR) || fs.mkdirSync(config.ACCESS_LOGS_DIR);
  // create a rotating write stream
  var accessLogStream = fileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(config.ACCESS_LOGS_DIR, env.NODE_ENV+'-access-%DATE%.log'),
    frequency: 'daily',
    verbose: true
  });
  app.use(logger('combined', {stream: accessLogStream}));
}

// use middleware
app.use(favicon(path.join(__dirname, 'public', '/static/img/favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: function (res, path, stat){
    res.setHeader("Content-Type", mime.lookup(path));
    if(path.indexOf('woff') !== -1 || path.indexOf('tff') !== -1 || path.indexOf('svg') !== -1){
      res.setHeader("Access-Control-Allow-Origin", "*");
    }
  }
}));

// mount routes
app.use('/', require('./routes/mw.js'));//处理所有路由的中间件。因此要在挂载其它路由之前挂载该中间件
app.use('/api', require('./routes/jsapi_auth_mw.js'));
function getRoutes(routesPath) {
  glob.sync(routesPath).forEach(function (routePath) {
    var basename = path.basename(routePath, path.extname(routePath));
    if(basename !== 'mw' && basename !== 'jsapi_auth_mw'){
      app.use('/', require(routePath));
    }
  });
}
getRoutes('./routes/*.js');


// error handler
app.use(function(req, res, next) {
  res.status(404);
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  logUtil.error(404, {url:fullUrl});
  res.render('error', {
    message: "对不起，您访问的页面不小心跑掉了"
  });
});

if (env.NODE_ENV !== 'production') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    err.status = err.status || 500;
    logUtil.error(err);
    logUtil.echo(err);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}else{
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    err.status = err.status || 500;
    res.render('error', {
      message: err.message
    });
  });
}

module.exports = app;
