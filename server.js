let http = require("http");
let mo = require("./modules/utils");
let url = require("url");

class Server {
    // Create server constructor
    constructor(){
        // Bind the method handleRequest to server to allow for responses
        this.server = http.createServer(this.handleRequest.bind(this));
    }

    // Start listening on port 8888
    start(){
        this.server.listen(8888);
    }

    // Returns a greeting string with name and date
    handleRequest(req, res) {
        let params = url.parse(req.url, true);
        let pathname = params.pathname;

        // getDate
        if (params.query.name) {
            res.writeHead(200, {'Content-Type':'text/html'});
            res.write(mo.date(params.query.name));    
            return res.end();
        }

        // writeFile
        else if (params.query.text){
            return mo.writeFile(params.query.text, req, res);
        }
        
        // readFile
        else if (pathname.startsWith("/readFile")) {
            return mo.readFile(pathname, req, res);
        }
        res.end();
    }
}

let server = new Server();
server.start();