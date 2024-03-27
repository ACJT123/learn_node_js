const http = require("http");
const fs = require("fs");
const { error } = require("console");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  // set header content type
  res.setHeader("Content-Type", "text/html");

  // send an html file
  fs.readFile("./views/index.html", (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.end(data);
    }

  });
});

server.listen(5000, "localhost", () => {
  console.log("listening for request");
});
