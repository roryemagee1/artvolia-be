const http = require('http');

const server = http.createServer((req, res) => {
  console.log("Incoming Request");
  console.log(req.method, req.url);

  res.end('Done!')
});

server.listen(3000);

