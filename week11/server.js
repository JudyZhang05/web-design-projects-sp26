const express = require('express')
const nunjucks = require('nunjucks')

// new for us to incorporate socket
const { Server } = require('socket.io')
const { createServer } = require('http')

const app = express()
// new initializations
const httpServer = createServer(app)
const io = new Server(httpServer) // links websocket server to an express server

// regular middleware
app.use(express.static('public'))
app.set('view engine', 'njk')
nunjucks.configure('views', {
    autoescape: true,
    express: app
})

// regular routes
app.get('/', (request, response) => {
    response.render('index.njk', {numClient: io.engine.clientsCount + 1})
    console.log( 'total users ' + io.engine.clientsCount)
    io.emit('client id', io.engine.clientsCount)
})

// new handler for determining if a client has connected
// any websopcket events will go into this connection handler
io.on('connection', (socket) => {
	console.log('a user connected');
	console.log('total users ' + io.engine.clientsCount);

    socket.on('silly note', (dataFromClient) => {
        console.log('message: '+ dataFromClient)

        // send the data back to the client
        io.emit('server sent data', dataFromClient)
    })

    // example of handling a specific event fired from client
    // connect / disconnect are reserved words and cant be used for other means
    socket.on('disconnect', () => {
        console.log('user disconnected');
        console.log('total users ' + io.engine.clientsCount)
        io.emit('client id', io.engine.clientsCount)
	});
});

// replaces app.listen and instead uses the http server
httpServer.listen(3000, () => {
    console.log('server has started on port 3000')
})