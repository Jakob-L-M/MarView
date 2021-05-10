var PanoViewer = eg.view360.PanoViewer;

// Pano display script

function display_pano(link) {
    let container = document.querySelector('#pano')
    viewer = new PanoViewer(container, { projectionType: 'eg.view360.PanoViewer.PROJECTION_TYPE.EQUIRECTANGULAR' });
    document.getElementById('result_screen').style.visibility = 'collapse'
    document.getElementById('start_button').style.visibility = 'collapse'
    document.getElementById('pano').style.visibility = 'visible'

    // viewer.setImage(`../../data/${id}.jpg`);
    console.log(link)
    viewer.setImage(link);

}
