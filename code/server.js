const http = require('http');
const express = require('express');
const cors = require('cors');
var fs = require('fs');
var util = require('./lib/utilities.js')

const app = express();

//json of locations
var locations;

app.use(express.static(`${__dirname}`));
app.use(cors());

const server = http.createServer(app).listen(5050, function() {
    console.log("Express server listening on port 5050");
    fs.readFile('data_control.json', 'utf8', function(err, data) {
        if (err) throw err;
        locations = JSON.parse(data);
    });
    console.log('Ready');
});
const io = require('socket.io').listen(server)

//number of players
var n_players = 0

var players = {}

var n_players_guessed = 0
var dest;
var current_round = 0

io.sockets.on('connection', (socket) => {

    var player_id = Math.floor(Math.random() * 2 ** 30);
    var is_playing = false;
    var pano_size = "L";

    while (player_id in players) {
        player_id = Math.floor(Math.random() * 2 ** 30)
    }

    players[player_id] = { id: player_id }

    socket.emit('set_id', player_id)

    socket.on('disconnect', () => {

        if (is_playing) {
            n_players -= 1;
        }

        // delete entry of player
        delete players[player_id]

        // update display for all players
        io.emit('display_players', players);
    });

    socket.on('start_round', () => {
        // number of available locations
        n_pics = locations.length

        current_round++
        // copy to ensure correct round kill after timeout
        let round = current_round

        const rnd = Math.floor(Math.random() * n_pics);

        // access data
        dest = [locations[rnd]['lat'], locations[rnd]['lng']]
        location = locations[rnd]['location']
        fact = locations[rnd]['fact']
        const by = locations[rnd]['by'];
        const date = locations[rnd]['date']
        const id = locations[rnd]['id']

        io.emit('start_round', `./panos/${pano_size}/${id}.jpg`);

        setTimeout(() => { end_round(round) }, 4000)
    });


    socket.on('lock_guess', (marker) => {
        let dist = util.coord_dist(dest, marker);

        n_players_guessed += 1;

        players[player_id]['marker'] = marker
        players[player_id]['dist'] = dist

        console.log(player_id);

        if (n_players == n_players_guessed) {
            console.log('Lock', players, player_id)
            end_round(current_round)
            n_players_guessed = 0;
        }
    })

    socket.on('set_userdata', (username, color) => {

        // setting username and color
        players[player_id]['username'] = username;
        players[player_id]['color'] = color;

        // Size in which pictures are displayed
        // 0: Large, 1:Medium, 2:Small
        // TODO
        pano_size = "L";

        io.emit('display_players', players);
        is_playing = true;
        n_players += 1;
    });

    function end_round(round) {
        if (round == current_round) {
            io.emit('end_round', dest, players)
        }
    }
})

server.on('error', (err) => {
    console.error(err);
})