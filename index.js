const http = require ('http')
const port = 5000

const server = http.createServer ((req, res ) => {
    res.end('Que pedillo?')
})

server.listen(port, () => {
    console.log('The server is working wiht changuitos')
})