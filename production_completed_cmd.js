/**
 * Created by zhuqi on 10/22/16.
 */
var fs = require('fs');

fs.open("./.env","w",function(err,fd){
    var env = 'NODE_ENV='+process.argv[2]+
              '\nPORT='+process.argv[3]+
              '\nHTTPS='+process.argv[4];
    var buf = new Buffer(env);
    fs.write(fd,buf,0,buf.length,0,function(err,written,buffer){
        console.log('NODE_ENV 已设置为 '+process.argv[2]+"\n");
        console.log('PORT 已设置为 '+process.argv[3]+"\n");
        console.log('HTTPS 已设置为 '+process.argv[4]+"\n");
        console.log('请执行 npm install 安装依赖后，再启动 web 服务'+"\n");
    });
});
