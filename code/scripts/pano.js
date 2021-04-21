var container
var viewer
var last_pano

function display_pano(id) {
    if (viewer == undefined) {
        container = document.querySelector('#pano')
        viewer = new PANOLENS.Viewer({ container: container, controlBar: false });
    }
    
    document.getElementById('result_screen').style.visibility = 'collapse'
    document.getElementById('start_button').style.visibility = 'collapse'
    document.getElementById('pano').style.visibility = 'visible'
    
    const panorama = new PANOLENS.ImagePanorama(`..//data/${id}.jpg`);
    
    console.log(viewer)
    viewer.add(panorama)
    viewer.setPanorama(panorama);
    console.log(viewer)
    last_pano = panorama;
}
