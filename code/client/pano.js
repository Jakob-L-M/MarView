var container
var PanoViewer = eg.view360.PanoViewer;
var last_pano
var viewer

container = document.querySelector('#pano')
viewer = new PanoViewer(container, {projectionType: 'eg.view360.PanoViewer.PROJECTION_TYPE.EQUIRECTANGULAR' });

function display_pano(id) {    
    container = document.querySelector('#pano')
    document.getElementById('result_screen').style.visibility = 'collapse'
    document.getElementById('start_button').style.visibility = 'collapse'
    document.getElementById('pano').style.visibility = 'visible'
    
    viewer.setImage(`../../data/${id}.jpg`);
}
