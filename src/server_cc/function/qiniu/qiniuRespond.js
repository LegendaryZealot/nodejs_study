var qiniu = require("qiniu")

function handler(res,query,configJson){
    var mac = new qiniu.auth.digest.Mac(configJson.qiniuAccessKey, configJson.qiniuSecretKey)
    var config = new qiniu.conf.Config()
    var bucketManager = new qiniu.rs.BucketManager(mac, config)
    var deadline = Date.now() + configJson.qiniuDeadLine
    var privateDownloadUrl = bucketManager.privateDownloadUrl(query.url, query.key, deadline)
    res.status(200).send(privateDownloadUrl)
}

function handleRequest(req,res,method,configJson){
    var query= method === 'get'?req.query:req.body;
    if(configJson.isHttpsEndable&req.protocol === 'https') {
        handler(res,query,configJson)
    }
    if(configJson.isHttpEnable&req.protocol === 'http'){
        handler(res,query,configJson)
    }
}

module.exports={
    handleRequest
}