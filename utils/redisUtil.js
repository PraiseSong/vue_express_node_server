/**
 * Created by zhuqi on 11/2/16.
 */
var config = require("../config");
var logUtil = require('./logUtil');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var redis   = require("redis");

var client  = redis.createClient(config.REDIS.PORT, config.REDIS.HOST, {auth_pass: config.REDIS.PASS});

client.on('ready',function(res){
    logUtil.echo('Redis ready');
});
client.on('connect', function() {
    logUtil.echo('Connected to Redis');
});

module.exports = {
    client: client,
    init: function (){
        return session({
            store: new redisStore({
                client: client,
                ttl: config.REDIS.TTL,
                logErrors: true
            }),
            secret: config.REDIS.SECRET,
            resave:true,

            saveUninitialized: true,
            cookie: {
                maxAge: config.COOKIE_EXPIRES
            },
            rolling: true,
            name: config.SESSION_KEY,
            genid: function (req){
                return Date.now()+"";
            }
        });
    }
};
