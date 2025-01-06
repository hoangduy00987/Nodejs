const http = require('http');
const fs = require('fs');

let server = http.createServer((req, res) => {
    fs.readFile('input.txt', 'utf-8', (err, data) => {
        res.end(data);
    })
    
})
server.listen(3000, () => {
    console.log("Server Ready");
})