var http = require('http');

http.createServer(function(req, res){
    res.writeHead(200, {'content-type' : 'application/json'});
    var obj = {
        firstName : "Hoang",
        lastName  : "Duy"
    }
    res.end(JSON.stringify(obj));
}).listen(8000)
