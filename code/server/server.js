const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const { text } = require('express');
var $ = require( "jquery" );

const app = express();
//number of pictures
const pic_n = 12;

app.use(express.static(`${__dirname}/..`));
app.use(express.static(`${__dirname}/../../`));

const server = http.createServer(app);
const io = socketio(server)

io.on('connection', (socket) => {
    console.log('connection');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('start_round', () => {
        const rnd = Math.floor(Math.random() * pic_n) + 1;

        io.emit('start_round', rnd)
    });
})

server.on('error', (err) => {
    console.error(err);
})

server.listen(5050, () => {
    console.log('Server bereit');
})