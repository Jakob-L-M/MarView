var map = L.map(document.getElementById('mapid')).setView([50.80344938458088, 8.766699833424578], 11);

// Current guessing marker
var curr_marker

// Real Coordinate of picture
var pos_goal = [50.79866043515019, 8.762314364220718];


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/outdoors-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWliYXNlciIsImEiOiJjamphdWZxeTgzMTBuM3BvaGdvdGhidDlzIn0.W6MiurHvSwBs0LvTfEtdrQ',
}).addTo(map);

var latlngs = [
    [45.51, -122.68],
    [37.77, -122.43],
    [34.04, -118.2]
];


function onMapClick(e) {
    if (curr_marker != undefined) {
        curr_marker.setLatLng(e.latlng)
    } else {
        curr_marker = L.marker(e.latlng).addTo(map);
    }
}

map.on('click', onMapClick);

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
        // When the user clicks the button, open the modal 
        modal.style.display = "block";

        var result_map = L.map(document.getElementById('result_map')).setView(pos_goal, 14);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/outdoors-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoibWliYXNlciIsImEiOiJjamphdWZxeTgzMTBuM3BvaGdvdGhidDlzIn0.W6MiurHvSwBs0LvTfEtdrQ',
        }).addTo(result_map);

        L.marker(pos_goal).addTo(result_map);
        L.marker(curr_marker._latlng).addTo(result_map);
        L.polyline([pos_goal, curr_marker._latlng], {
            color: 'blue',
            dashArray: '6, 6',
            opacity: 0.6,
            weight: 2
        }).addTo(result_map);

        document.getElementById('test').innerHTML = `Marker ist ${result} vom Ziel entfernt`
    }
}