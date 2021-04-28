var map = L.map(document.getElementById('mapid')).setView([50.80344938458088, 8.766699833424578], 11);

// Current guessing marker
var curr_marker

// player color
const color = 'F44336'

// Real Coordinate of picture
var pos_goal


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/outdoors-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWliYXNlciIsImEiOiJjamphdWZxeTgzMTBuM3BvaGdvdGhidDlzIn0.W6MiurHvSwBs0LvTfEtdrQ',
}).addTo(map);

function onMapClick(e) {
    if (curr_marker != undefined) {
        curr_marker.setLatLng(e.latlng)
    } else {
        curr_marker = L.marker(e.latlng, {icon: L.icon( {
            iconUrl: `..//..//assets/${color}.png`,
            iconSize: [32, 32],
            iconAnchor: [16, 16]
        })}).addTo(map);
    }
}

map.on('click', onMapClick);

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
    if (curr_marker != undefined) {
        let dist = coord_dist(pos_goal, curr_marker._latlng);
        let result = "";
        if (dist >= 1) {
            result = `${dist.toFixed(2)}km`
        } else {
            result = `${(dist * 1000).toFixed(1)}m`
        }
        modal = document.getElementById('result_screen');

        modal.style.display = "block";
        modal.style.visibility = 'visible'

        clear_map(result_map)
        result_map.setView(pos_goal, 14);

        L.marker(pos_goal, {icon: L.icon( {
            iconUrl: '..//..//assets/goal.png',
            iconSize: [48, 48],
            iconAnchor: [24, 24]
        })}).addTo(result_map);

        L.marker(curr_marker._latlng, {icon: L.icon( {
            iconUrl: `..//..//assets/${color}.png`,
            iconSize: [32, 32],
            iconAnchor: [16, 16]
        })}).addTo(result_map);
        
        L.polyline([pos_goal, curr_marker._latlng], {
            color: `#${color}`,
            dashArray: '6, 12',
            opacity: 1,
            weight: 3
        }).addTo(result_map);

        document.getElementById('test').innerHTML = `Marker ist ${result} vom Ziel entfernt`
    }
}

function next_round(id) {
    $.getJSON("data_control.json", function (data) {
        info = data[id - 1]
        display_pano(id)
        pos_goal = [info['lat'], info['lng']]
    });
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