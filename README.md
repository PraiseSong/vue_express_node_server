# qiakr_mall_server

> 洽客商城Nodejs服务端

这套系统由Node(6.6.0)+Express(4.X)+PM2+Redis+Arttemplate构建的一套MVC系统。

## Build Setup
#### install pm2
`npm install -g pm2`

#### install dependencies
`npm install`

#### serve with hot reload at localhost:80 or localhost:3000
* 修改`.env`文件的`NODE_ENV`为`development`
* 修改`.env`文件的`PORT`为你的端口号，默认`3000`
* `pm2 logs www`
* `npm run dev`
* 在`Mac OS`如果是`80`端口，请执行`sudo npm run dev`
* `npm run stop`停止服务

#### 生产环境
* `npm run start`
* `npm run restart`

#### 部署
* (如需要)修改`/deploy.json`的`deploy`配置
* `npm run ds`

#### 发布到线上环境
* (如需要)修改`/deploy.json`的`deploy`配置
* `npm run deploy`
* 发布成功后，会自动执行`node ./production_completed_cmd production 80 1`，将`/.env`文件中的环境变量设置为生产环境

#### QA
Q：如何创建一个由服务器渲染的页面？

A：第一步在`/views`目录中新增`art template`的模版页面；
第二步在`/controllers`目录中创建该页面的控制器；(请查看QA如何创建控制器)
第三步在`/routes/templates.js`中`require`该控制器，并且创建该页面的路由；
第四步重启服务，通过创建的路由就可以访问到新增的页面；


Q：如何创建控制器？

A：在`/controllers`目录中创建控制器，每个控制器是一个独立的文件夹，该文件夹中至少要包含`index.js`文件，
该控制器相关的方法和业务逻辑在`index.js`中编写，`index.js`中必须要有`init`方法，该方法用来初始化渲染页面，
创建完控制器后，记得在相应的路由中做挂载


Q：模版页面如何编写？

A：这套系统的模版用的是`art template`，请参考`art template`文档


Q：`/views`目录中有`html`文件，`/views/html`目录中也有`html`文件，这两者有啥区别？

A：`/views/*.html`这些`html`文件是`art template`的模版，由服务端渲染，`/views/html`目录中的`html`文件是纯静态页面，由前端`js`渲染


Q：日志文件在哪里？

A：日志存储在`/logs`目录，`/logs/biz`是线上环境的业务日志，`/logs/x.log`中带有`access`的日志文件名是访问日志

Q：`cookie`和`session`在哪里？

A：洽客使用的是分布式`cookie`和`session`架构，因此在`Node`层调用的是`express-session`和`redis`中间件，把`cookie`和`session`存储在`redis`

Q：`CA`证书在哪里？

A：`HTTPS`的`ssl`证书文件在`/certificate.pem`，`/privatekey.pem`，`/certrequest.csr`

Q：如何`debug`?
A：详见[这里-webstorm调试node](http://debug.qiakrdev.com/index.php?m=doc&f=view&docID=71)

## 目录结构

#### `/public`目录为静态资源
#### `/views`目录为页面
#### `/views/html`目录为静态页面
#### `/routes`目录为所有的路由
#### `/routes/jsapi.js`为所有的`JS`异步请求的路由
#### `/routes/mw.js`所有路由的中间件
#### `/routes/html.js`所有静态页面的路由
#### `/routes/template.js`所有模版页面的路由
#### `config.js`项目配置文件
#### `/logs_config`日志相关的配置
#### `/logs/**-access-date.log`访问日志
#### `/logs/biz/**-biz-date.log`业务日志
#### `.env`环境配置
#### `/controllers`目录为所有的控制器
#### `/utils`目录为工具库
#### `/utils/FUtil.js`为常用的函数库
#### `/utils/httpUtil.js`为`http client`函数库
#### `/deploy.json`为部署脚本
