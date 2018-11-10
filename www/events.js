//events

function onMapClick(e) {

}


function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 5,
        color: '#ddd',
        dashArray: '',
    });
}

function resetHighlight(e) {
var layer = e.target;
layer.setStyle({
  color : layer.options.fillColor
});

}


function onClickCircles(e) {

    clearObjects(visibleroutes);

    map.fitBounds(e.target.getBounds());
    var circle = e.target;
    circle.setStyle({  //coordinate
    });
}

function onClickLondon(e) {
  var circlebounds = e.target.getBounds();
    clearObjects(visibleStations);
    for( let i = 0; i<stations.length; ++i){
                      drawStation(i);
    }


    map.setView([51.462252, -0.106578], 12);


}
