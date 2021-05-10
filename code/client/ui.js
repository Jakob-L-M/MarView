
function create_player_span(player, color) {
    var player_span = document.createElement('span')
    player_span.innerHTML = player;
    var li = document.createElement('li');
    li.style.backgroundColor = `#${color}`
    li.appendChild(player_span);

    document.getElementById('player_panels').appendChild(li)
}

function clear_player_panels() {
    document.getElementById('player_panels').innerHTML = '';
}

document.getElementById('login_button').onclick = () => {
    if (document.getElementById('username_input').value != "") {
        
        send_userdata(document.getElementById('username_input').value, document.getElementById('color_input').value)
        set_color(document.getElementById('color_input').value)
        
        document.getElementById('login_page').style.display = 'none'
        document.getElementById('main_page').style.display = 'block'
        document.getElementById('main_page').style.visibility = "visible";
    }
}
