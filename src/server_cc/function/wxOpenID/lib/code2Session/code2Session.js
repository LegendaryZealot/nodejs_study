var https = require('https')
var qs    = require('querystring')

function request(appid,secret,code,succeedCallback,failCallback){
    var data = {
        grant_type:'authorization_code',
        appid:appid,
        secret:secret,
        js_code:code
    }
    var content = qs.stringify(data)
    var options = {  
        hostname: 'api.weixin.qq.com',  
        port: 443, 
        path: '/sns/jscode2session?'+content,
        method: 'GET'  
    }
    var req = https.request(options, function (res) {
        res.setEncoding('utf8');
        var result=''
        res.on('data', function (chunk) {
            result+=chunk
        })
        res.on("end",function(){
            if(succeedCallback){
                succeedCallback(result)
            }
        })
    })
    req.on('error', function (e) {
        if(failCallback){
            failCallback(e.message)
        }
    })
    req.end()
}

module.exports={
    request
}