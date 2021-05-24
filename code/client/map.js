
var map;

// Current guessing marker
var curr_marker

// Player color
var socket_color;

var socket_id;

var result_map = L.map(document.getElementById('result_map'))
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/outdoors-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWliYXNlciIsImEiOiJjamphdWZxeTgzMTBuM3BvaGdvdGhidDlzIn0.W6MiurHvSwBs0LvTfEtdrQ',
}).addTo(result_map);

function lock_guess() {
    if (curr_marker) {
        send_guess(curr_marker._latlng);
        document.getElementById('guess_button').style.display = 'none'
    }
}

function display_result_screen(dest_marker, players) {

    console.log(players)

    modal = document.getElementById('result_screen');

    modal.style.display = "block";
    modal.style.visibility = "visible";

    clear_map(result_map)
    result_map.setView(dest_marker, 14);

    L.marker(dest_marker, {
        icon: L.icon({
            iconUrl: '..//assets/goal.png',
            iconSize: [48, 48],
            iconAnchor: [24, 24]
        })
    }).addTo(result_map);

    for (player in players) {
        console.log(player)
        if ('marker' in players[player]) {
            L.marker(players[player]['marker'], {
                icon: L.icon({
                    iconUrl: `..//assets/${players[player]['color']}.png`,
                    iconSize: [32, 32],
                    iconAnchor: [16, 16]
                })
            }).addTo(result_map);

            L.polyline([dest_marker, players[player]['marker']], {
                color: `#${players[player]['color']}`,
                dashArray: '6, 12',
                opacity: 1,
                weight: 3
            }).addTo(result_map);
        }
    }

    let result = "";
    let dist = players[socket_id]['dist'];
    if (dist >= 1) {
        result = `${dist.toFixed(2)}km`
    } else {
        result = `${(dist * 1000).toFixed(1)}m`
    }

    document.getElementById('test').innerHTML = `Marker ist ${result} vom Ziel entfernt`
}

function next_round(id, link) {

    if (!map) {
        map = L.map(document.getElementById('mapid')).setView([50.80344938458088, 8.766699833424578], 11);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/outdoors-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoibWliYXNlciIsImEiOiJjamphdWZxeTgzMTBuM3BvaGdvdGhidDlzIn0.W6MiurHvSwBs0LvTfEtdrQ',
        }).addTo(map);
        map.on('click', (e) => {
            if (curr_marker != undefined) {
                curr_marker.setLatLng(e.latlng)
            } else {
                curr_marker = L.marker(e.latlng, {
                    icon: L.icon({
                        iconUrl: `..//assets/${socket_color}.png`,
                        iconSize: [32, 32],
                        iconAnchor: [16, 16]
                    })
                }).addTo(map);
            }
        });
    }

    document.getElementById('guess_button').style.display = 'block'
    display_pano(id, link)
}

function clear_map(map) {
    map.eachLayer(function (layer) {
        map.removeLayer(layer)
    });
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/outdoors-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibWliYXNlciIsImEiOiJjamphdWZxeTgzMTBuM3BvaGdvdGhidDlzIn0.W6MiurHvSwBs0LvTfEtdrQ',
    }).addTo(map);
}

function set_id(id) {
    socket_id = id;
}

function set_color(color) {
    socket_color = color;
}

function get_color() {
    return socket_color;
}