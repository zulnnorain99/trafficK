//events

function onMapClick(e) {}


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
