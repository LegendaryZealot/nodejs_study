var rootRespond       = require('./root/rootRespond')
var wxOpenIDRespond   = require('./wxOpenID/wxOpenIDRespond')
var qiniuRespond      = require('./qiniu/qiniuRespond')
var usrInfoSetRespond = require('./usrInfo/usrInfoSetRespond')
var usrInfoGetRespond = require('./usrInfo/usrInfoGetRespond')
var vectorSetRespond  = require('./vector/vectorSetRespond')
var vectorGetRespond  = require('./vector/vectorGetRespond')

var method={
    post:'post',
    get:'get'
}

var routerEnum={
    root:'/',
    qiniu:'/qiniu',
    wxOpenID:'/wxOpenID',
    usrInfoSet:'/usrInfoSet',
    usrInfoGet:'/usrInfoGet',
    vectorSet:'/vectorSet',
    vectorGet:'/vectorGet'
}

function init(app,configJson){
    // root
    linkRespond(app,routerEnum.root,rootRespond,configJson)
    // wxOpenID
    linkRespond(app,routerEnum.wxOpenID,wxOpenIDRespond,configJson)
    // qiniu
    linkRespond(app,routerEnum.qiniu,qiniuRespond,configJson)
    // usrInfoSet
    linkRespond(app,routerEnum.usrInfoSet,usrInfoSetRespond,configJson)
    // usrInfoGet
    linkRespond(app,routerEnum.usrInfoGet,usrInfoGetRespond,configJson)
    // vectorSet
    linkRespond(app,routerEnum.vectorSet,vectorSetRespond,configJson)
    // vectorGet
    linkRespond(app,routerEnum.vectorGet,vectorGetRespond,configJson)
}

function linkRespond(app,key,respond,configJson){
    if(configJson.isGetEndable){
        app.get(key,function(req,res){
            respond.handleRequest(req,res,method.get,configJson)
        })
    }
    if(configJson.isPostEndable){
        app.post(key,function(req,res){
            respond.handleRequest(req,res,method.post,configJson)
        })
    }
}

module.exports={
    init
}