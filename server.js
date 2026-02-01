let http = require("http");
let mo = require("./modules/utils");
let url = require("url");
let STRINGS = require("./lang/en/en.js")

class Server {
    // Create server constructor
    constructor(){
        // Bind the method handleRequest to server to allow for responses
        this.server = http.createServer(this.handleRequest.bind(this));
    }

    // Start listening on port 8888
    start(){
        this.server.listen(process.env.PORT || 8888);
    }

    // Returns a greeting string with name and date
    async handleRequest(req, res) {
        let params = url.parse(req.url, true);
        let pathname = params.pathname.replace(/\/$/, "");

        // getDate
        if (pathname === `${STRINGS.BASE_PATH}/getDate` && params.query.name) {
            res.writeHead(200, {'Content-Type':'text/html'});
            res.write(mo.date(params.query.name));    
            return res.end();
        }

        // readFile
        else if (pathname.startsWith(`${STRINGS.BASE_PATH}/readFile`)) {
            return mo.readFile(pathname, STRINGS.BASE_PATH, req, res);
        }

        // writeFile
        else if (pathname === `${STRINGS.BASE_PATH}/writeFile` && params.query.text){
            await mo.writeFile(params.query.text, req, res);
            return;
        }
        
        res.end();
    }
}

let server = new Server();
server.start();