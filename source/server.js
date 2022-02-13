var http = require('http');
var url = require('url');


var server = http.createServer(function (req, res) {
  urlParts = new URL(req.url,req.protocol+"://"+req.headers.host+"/");
  // url.parse(req.url);
  // console.log(req);ç
  console.log(urlParts);
  console.log(req.url);
  var result={
  switch(req.url){
    case '/healthz':
      res.writeHead(200, {'Content-Type': 'application/json'});
      result.status="running";
      break;
    case  '/close':
      res.writeHead(200, {'Content-Type': 'application/json'});
      result.status="server Closes in 1 sec";
      setTimeout(server.close,1000);
      break;
    default:
      res.writeHead(404, {'Content-Type': 'application/json'});
      result.status="invalid path";

  }
  res.write(JSON.stringify(result));
  res.end();
  
});

exports.listen = function(port){
  console.log("Listening on port:"+port);
  server.listen(port);
}
exports.close = function(){
  console.log('Closing the server');
  server.close();
}
