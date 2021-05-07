const http = require('http');
var https = require('https');
const express = require('express');
const socketio = require('socket.io');
const { text } = require('express');
var fs = require('fs');
var gcloud = require('./gcloud.js')

const app = express();
//number of pictures
var json_data;

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
        // number of availible locations
        n_pics = json_data.length

        const rnd = Math.floor(Math.random() * n_pics);
        
        gcloud.gcloud('11q8gVBJ7XPksi-L5Hd12a58QaCirdMOQ', 4096, '1').then(link => {
            console.log(link)
            io.emit('start_round', rnd, link);
        })
    });
})

server.on('error', (err) => {
    console.error(err);
})

server.listen(5050, () => {
    console.log('Server bereit');
    fs.readFile('data_control.json', 'utf8', function (err, data) {
        if (err) throw err;
        json_data = JSON.parse(data);
      });
})