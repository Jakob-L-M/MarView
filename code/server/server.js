const http = require('http');
var https = require('https');
const express = require('express');
const socketio = require('socket.io');
const { text } = require('express');
var fs = require('fs');
var gcloud = require('./gcloud.js')
var util = require('./utilities.js')

const app = express();
//number of pictures
var locations;

app.use(express.static(`${__dirname}/..`));
app.use(express.static(`${__dirname}/../../`));

const server = http.createServer(app);
const io = socketio(server)

//number of players
var n_players = 0

var players = {}

var n_players_guessed = 0

io.on('connection', (socket) => {

    var dest;
    var location;
    var fact;

    n_players += 1;

    player_id = Math.floor(Math.random() * 2**16);

    console.log(player_id)

    while (player_id in players) {
        player_id =  Math.floor(Math.random() * 2**16)
    }

    players[player_id] = {id: player_id}

    console.log(`Current Players = ${n_players}`, players)

    console.log('connection');

    socket.on('disconnect', () => {
        n_players -= 1;
        delete players[player_id]
        console.log(`Current Players = ${n_players}`, players)
        console.log('user disconnected');
    });

    socket.on('start_round', () => {
        // number of availible locations
        n_pics = locations.length

        const rnd = Math.floor(Math.random() * n_pics);
        dest = [locations[rnd]['lat'], locations[rnd]['lng']]
        location = locations[rnd]['location']
        fact = locations[rnd]['fact']
        const by = locations[rnd]['by'];
        const date = locations[rnd]['date']
        const name = locations[rnd]['name']
        const link = locations[rnd]['link']

        
        gcloud.gcloud('11q8gVBJ7XPksi-L5Hd12a58QaCirdMOQ', 4096, '1').then(link => {
            console.log(link)
            io.emit('start_round', link);
        })
    });

    socket.on('lock_guess', (marker) => {
        let dist = coord_dist(dest, marker._latlng);
        
        // build result string
        let result = "";
        if (dist >= 1) {
            result = `${dist.toFixed(2)}km`
        } else {
            result = `${(dist * 1000).toFixed(1)}m`
        }

        n_players_guessed += 1;

        players[player_id]['marker'] = marker._latlng

        if (n_players = n_players_guessed) {
            // emit end round
        }

    })
})

server.on('error', (err) => {
    console.error(err);
})

server.listen(5050, () => {
    console.log('Server bereit');
    fs.readFile('data_control.json', 'utf8', function (err, data) {
        if (err) throw err;
        locations = JSON.parse(data);
      });
})