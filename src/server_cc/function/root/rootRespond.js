function handler(res,query,configJson){
    res.status(200).send(query)
}

function handleRequest(req,res,method,configJson){
    var query= method === 'get'?req.query:req.body
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