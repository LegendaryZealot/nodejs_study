var code2Session = require('./lib/code2Session/code2Session')

function handler(res,query,configJson){
    code2Session.request(
        query.appid,
        query.secret,
        query.code,
        (result)=>{
            res.status(200).send(result)
        },
        (error)=>{
            res.status(200).send(error)
        }
    )
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