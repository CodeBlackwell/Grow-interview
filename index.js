var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Hello, Mocha!');
});

exports.listen = function(port) {
  console.log('Listening on: ' + port);
  server.listen(port);
};

// close destroys the server.
exports.close = function() {
  server.close();
};