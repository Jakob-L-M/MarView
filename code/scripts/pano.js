var container
var PanoViewer = eg.view360.PanoViewer;
var last_pano
var viewer

function display_pano(id) {
    if (viewer == undefined) {
        container = document.querySelector('#pano')
        viewer = new PanoViewer(container, {projectionType: 'eg.view360.PanoViewer.PROJECTION_TYPE.EQUIRECTANGULAR' });
    }
    
    document.getElementById('result_screen').style.visibility = 'collapse'
    document.getElementById('start_button').style.visibility = 'collapse'
    document.getElementById('pano').style.visibility = 'visible'
    
    console.log(viewer)
    viewer.setImage(`..//data/${id}.jpg`);
    console.log(viewer)
}
