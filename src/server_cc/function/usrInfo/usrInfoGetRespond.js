var mongoHelper = require('../lib/mongoHelper')

function handler(res,query,configJson){
    mongoHelper.getCollection(configJson.mongoDbUrl,configJson.mongoDbUsrDbName,configJson.mongoDbUsrCollectionName,function(err,result){
        if(err){
            throw err
        }
        result.collection.find({openId:query.openId}).limit(1).toArray(function(err,findRes){
            if(err){
                throw err
            }
            if(findRes.length>0){
                res.status(200).send(findRes[0])
            }
        })
        result.db.close()
    })
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