const http = require("http");
const url  = require("url");
const fs   = require("fs");

http.createServer(function (req, res) {
    const url_module = url.parse(req.url, true);
    let filename = "." + url_module.pathname + ".html";
    fs.stat(filename, function (err, stats) {
        if (err) {
            res.writeHead(404, {"Content-Type": "text/html"});
            fs.readFile("./404.html", function (err, data) {
                res.write(data);
                return res.end();
            });
        } 
        else {
            fs.readFile(filename, function (err, data) {
                if (err) {
                    res.writeHead(500, {"Content-Type": "text/html"});
                    res.write("Server Error");
                    return res.end();
                }
                res.writeHead(200, {"Content-Type": "text/html"});
                res.write(data);
                return res.end();
            });
        }
    });
    
}).listen(8080);

