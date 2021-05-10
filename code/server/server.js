const http = require('http');
const express = require('express');
const socketio = require('socket.io');
var fs = require('fs');
var gcloud = require('./gcloud.js')
var util = require('./utilities.js')

const app = express();

//json of locations
var locations;

app.use(express.static(`${__dirname}/../`));

const server = http.createServer(app);
const io = socketio(server)

//number of players
var n_players = 0

var players = {}

var n_players_guessed = 0
var dest;
var location;
var fact;

io.on('connection', (socket) => {

    n_players += 1;

    var player_id = Math.floor(Math.random() * 2 ** 16);

    while (player_id in players) {
        player_id = Math.floor(Math.random() * 2 ** 16)
    }

    players[player_id] = { id: player_id }

    socket.emit('set_id', player_id)

    io.emit('display_players', Object.keys(players));

    socket.on('disconnect', () => {
        n_players -= 1;
        delete players[player_id]
        io.emit('display_players', Object.keys(players));
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
            io.emit('start_round', link);
        })
    });


    socket.on('lock_guess', (marker) => {
        let dist = util.coord_dist(dest, marker);

        n_players_guessed += 1;

        players[player_id]['marker'] = marker
        players[player_id]['dist'] = dist

        console.log(player_id);

        if (n_players == n_players_guessed) {
            console.log('Lock', players, player_id)
            io.emit('end_round', dest, players);
            n_players_guessed = 0;
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