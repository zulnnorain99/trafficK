//events

var showingStations = false;

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






function onClickCity(e) {
/*  var circle = e.target;
  var circlebounds = e.target.getBounds();*/
  clearObjects(visibleStations);

    for (var station in stations) {
      drawStation(station);
    }
  /*  var latlng = circle.getLatLng();
    map.setView(latlng, 12);*/

}
for (var station in stations) {
  drawStation(station);
}
