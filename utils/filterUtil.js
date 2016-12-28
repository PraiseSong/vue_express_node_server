/**
 * Created by zhuqi on 10/19/16.
 */

module.exports = {
    /**
     * 用户登录认证过滤器
     * @param req
     * @param res
     * @param next
     */
    authorize: function(req, res, next) {
        if (!req.session.user_id) {
            res.redirect('/login.html');
        } else {
            next();
        }
    }
};
