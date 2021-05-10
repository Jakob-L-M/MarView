
function create_player_span(id) {
    var player_span = document.createElement('span')
    player_span.innerHTML = id;
    var li = document.createElement('li');
    li.appendChild(player_span);

    document.getElementById('player_panels').appendChild(li)
}
