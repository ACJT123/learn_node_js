const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
});

server.listen(5000, "localhost", () => {
    console.log('listening for request');
});
