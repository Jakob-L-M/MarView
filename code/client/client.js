var socket = io();

// this scrpit handels communication with the server

function start_round() {
    socket.emit('start_round', "");
}

function send_guess(marker) {
    socket.emit('lock_guess', marker);
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

socket.on('display_players', (player_ids) => {
    clear_player_panels()
    console.log(player_ids)
    for (var i = 0; i < player_ids.length; i++) {
        create_player_span(player_ids[i])
    }
});