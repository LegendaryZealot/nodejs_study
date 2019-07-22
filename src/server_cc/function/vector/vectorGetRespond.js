var mongoHelper =require('../lib/mongoHelper')

function handler(res,query,configJson){
    mongoHelper.getCollection(configJson.mongoDbUrl,query.vector,query.item,function(err,result){
        if(err){
            throw err
        }
        result.collection.find({openId:query.openId}).limit(1).toArray(function(err,findRes){
            if(err){
                throw err
            }
            if(findRes.length>0){
                var document=findRes[0]
                delete document._id
                delete document.openId
                res.status(200).send(document)
            }
            result.db.close()
        })
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