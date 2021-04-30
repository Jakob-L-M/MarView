var socket = io();

function start_round() {
    socket.emit('start_round', "")
}

socket.on('start_round', (id, link) => {
    next_round(id, link)
})