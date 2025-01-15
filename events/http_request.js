const http = require("http");
const server = http.createServer();

server.on('request', (req,res) => {
    console.log('Request received!');
    res.end('Hello World!');
});

server.listen(8000, () => {
    console.log('Server running on port 8000');
});