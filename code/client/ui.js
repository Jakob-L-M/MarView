
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
    if (document.getElementById('username_input').value != "" && get_color()) {
        
        send_userdata(document.getElementById('username_input').value, get_color())
        
        document.getElementById('login_page').style.display = 'none'
        document.getElementById('main_page').style.display = 'block'
        document.getElementById('main_page').style.visibility = "visible";
    }
}

{
    const colors = ['000000', '3F51B5', '4CAF50', '9C27B0', '18FFFF', '673AB7', '795548', 'CDDC39', 'E91E63', 'F44336', 'FF9800', 'FFFFFF']
    colors.forEach(color => {
        var panel = document.createElement('button')
        panel.className = 'color_button'
        panel.style.backgroundColor = `#${color}`
        panel.onclick = () => {
            // send request to server
            set_color(color)
            document.getElementById("username_input").style.boxShadow = `0 0 10px #${color}`
        }
        document.getElementById("color_buttons").appendChild(panel)
    })
}
