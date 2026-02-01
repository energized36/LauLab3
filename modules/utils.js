let STRINGS = require("../lang/en/en.js")
const fs = require('fs');
const fsPromises = require('fs').promises;

exports.date =
function (name){
    return `<!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Server Response</title>
                </head>
                <body>
                    <strong style="color: #2b78e4;">
                        ${STRINGS.GREETING.replace("%1", name)} ${Date().toString()}
                    </strong>
                </body>
            </html>`
}

// Function to write text to a file
exports.writeFile =
async function (text, req, res){
    let fileHandle = await fsPromises.open("file.txt", "a");
    fileHandle.write(text);
    if (fileHandle){
        await fileHandle.close();
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`${STRINGS.SUCCESS}`);
    return res.end();
}

// Function to read text from a file
exports.readFile =
function (pathname, req, res){
    const fileName = pathname.substring(10);

    fs.readFile(fileName, function (err, data) {
        // Handle file not found or empty filename
        if (err || fileName && fileName.trim() === "") {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end(fileName + " " + STRINGS.ERROR);
        }
        // File found, send content
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
    fs.close();
}