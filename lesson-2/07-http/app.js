const http = require('node:http')

const server = http.createServer((req, res) => {
    res.end('okay')
})

server.listen(8080, "0.0.0.0", () => {
    console.log('Server start on port http://0.0.0.0:8080')
})