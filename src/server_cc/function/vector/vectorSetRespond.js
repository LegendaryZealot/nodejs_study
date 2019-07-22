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
            var openId=query.openId
            delete query.vector
            delete query.item
            delete query.openId
            var document={
                data:query
            }
            if(findRes.length>0){
                var where={
                    _id:findRes[0]._id
                }
                result.collection.updateOne(where,{$set:document},function(err,saveRes){
                    if(err){
                        throw err
                    }
                    result.db.close()
                    res.status(200).send(saveRes)
                })
            }else{
                document.openId=openId
                result.collection.insertOne(document,function(err,saveRes){
                    if(err){
                        throw err
                    }
                    result.db.close()
                    res.status(200).send(saveRes)
                })
            }
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