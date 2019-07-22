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
            var document={
                games:[]
            }
            document.openId=query.openId
            document.avatar=query.avatar
            document.nickName=query.nickName
            document.gender=query.gender
            document.country=query.country
            document.city=query.city
            document.province=query.province
            if(findRes.length==1){
                var old=findRes[0]
                document._id=old._id
                document.games=old.games
                var isGameIdContains=false
                for(var i in document.games){
                    if(document.games[i]==query.gameId){
                        isGameIdContains=true
                        break
                    }
                }
                if(false==isGameIdContains){
                    document.games.push(query.gameId)
                }
            }else{
                document.games.push(query.gameId)
            }
            result.collection.save(document,function(err,saveRes){
                if(err){
                    throw err
                }
                result.db.close()
                res.status(200).send(saveRes)
            })
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