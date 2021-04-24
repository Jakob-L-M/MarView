const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const { text } = require('express');

const app = express();

app.use(express.static(`${__dirname}/..`));
app.use(express.static(`${__dirname}/../../`));

const server = http.createServer(app);
const io = socketio(server)

io.on('connection', (sock) => {
    console.log('connection');
})

server.on('error', (err) => {
    console.error(err);
})

server.listen(5050, () => {
    console.log('Server bereit');
})