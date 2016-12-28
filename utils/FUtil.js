/**
 * Created by zhuqi on 10/19/16.
 */

module.exports = {
    /**
     * @description 转换json到querystring。不支持深度转换
     * @param {Object} json
     * @returns {String} queryString
     */
    json2querystring: function (json){
        if(typeof json !== 'object'){
            throw new error("arguments are not Object");
            return;
        }
        var qs = '';
        for (k in json) {
            if(qs.length > 0){
                qs += '&';
            }
            if(typeof json[k] === 'object'){
                json[k] = JSON.stringify(json[k]);
            }
            qs += k+"="+json[k];
        }

        return qs;
    }
};
