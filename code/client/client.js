var socket = io();

// this scrpit handels communication with the server

function start_round() {
    document.getElementById('start_button').style.display = 'none'
    socket.emit('start_round', "");
}

function send_guess(marker) {
    socket.emit('lock_guess', marker);
}

function send_userdata(username, color) {
    socket.emit('set_userdata', username, color);
}

socket.on('set_id', (id) => {
    set_id(id)
})

socket.on('start_round', (link) => {
    next_round(link)
})

socket.on('end_round', (dest_marker, players) => {
    display_result_screen(dest_marker, players);
})

socket.on('display_players', (players) => {
    clear_player_panels()
    console.log(players)
    for (player in players) {
        if (players[player]['username']) {
            create_player_span(players[player]['username'], players[player]['color']);
        }
    }
});