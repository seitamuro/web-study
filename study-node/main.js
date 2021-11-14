var http = require("http")

http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/plain"})

    res.end("Hello World")
}).listen(8081)

console.log("Server running at http://localhost:8081")