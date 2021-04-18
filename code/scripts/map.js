var mymap = L.map(document.getElementById('mapid')).setView([50.80344938458088, 8.766699833424578], 11);

// Current guessing marker
var curr_marker

// Real Coordinate of picture
var pos_gaol = [50.79866043515019, 8.762314364220718]


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWliYXNlciIsImEiOiJjamphdWZxeTgzMTBuM3BvaGdvdGhidDlzIn0.W6MiurHvSwBs0LvTfEtdrQ',
}).addTo(mymap);


function onMapClick(e) {
    if (curr_marker != undefined){
        mymap.removeLayer(curr_marker)
    }
    curr_marker = L.marker(e.latlng);
    mymap.addLayer(curr_marker);
    console.log(coord_dist(pos_gaol, e.latlng))
}

mymap.on('click', onMapClick);