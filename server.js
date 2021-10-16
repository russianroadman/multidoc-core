const api = require('./api/api')
const ws = require('websocket').server
const http = require('http')

const port = 8080
const server = http.createServer(api);

server.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
