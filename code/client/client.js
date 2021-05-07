var socket = io();

// this scrpit handels communication with the server

function start_round() {
    socket.emit('start_round', "")
}

socket.on('start_round', (link) => {
    next_round(link)
})