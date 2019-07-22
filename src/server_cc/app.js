var express = require('express')
var fs      = require('fs')
var http    = require('http');
var https   = require('https');

var configFile = 'appConfig.json'

//load config sync
var configData=fs.readFileSync(configFile);
var configJson=JSON.parse(configData.toString())

var privateKey  = fs.readFileSync(configJson.sslPrivateKeyPath, 'utf8')
var privateCertificate = fs.readFileSync(configJson.sslCertificatePath, 'utf8')
var credentials = {key: privateKey, cert: privateCertificate}

var staticRes=express.static(configJson.staticResDir)

var app = express();
app.use(staticRes)
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(configJson.httpPort, function() {
  var host = httpServer.address().address;
  var port = httpServer.address().port;
  console.log('httpServer running at http://' + host + ':' + port)
})

httpsServer.listen(configJson.httpsPort, function() {
  var host = httpsServer.address().address;
  var port = httpsServer.address().port;
  console.log('httpsServer running at http://' + host + ':' + port)
})

// Welcome
app.get('/', function(req, res) {
  if(req.protocol === 'https') {
      res.status(200).send('Welcome to Safety Land!');
  }
  else {
      res.status(200).send('Welcome!');
  }
})

// Welcome
app.get('/api', function(req, res) {
  if(req.protocol === 'https') {
      res.status(200).send('欢迎来到nginx delegate(https)!');
  }
  else {
      res.status(200).send('欢迎来到nginx delegate!');
  }
})