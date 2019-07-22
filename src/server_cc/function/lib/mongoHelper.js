var MongoClient  = require('mongodb').MongoClient

function getCollection(dbUrl,dbName,collectionName,callback){
    MongoClient.connect(dbUrl,
        {
            useNewUrlParser:true
        },
        function (err, db) {
            if(err){
                callback(err)
                return
            }
            var dbo = db.db(dbName)
            var collection=dbo.collection(collectionName)
            callback(null,{
                db:db,
                dbo:dbo,
                collection:collection
            })
        }
    )
}

module.exports={
    getCollection
}