//colors in hsl_col_perc

const red = 0,
      yellow = 60,
      green = 120,
      turquoise = 180,
      blue = 240,
      pink = 300;




//initialisation
var map = L.map('mapid').setView([51.462252, -0.106578], 12);

var visibleroutes = [];
var visibleStations = [];



map.invalidateSize();
var thunderforest_Transport = L.tileLayer('https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=c4fdde49b9a14b189c0fc231906018e5', {
	attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	apikey: 'c4fdde49b9a14b189c0fc231906018e5',
	maxZoom: 22
});

//map.setStyle({ zoomControl:false });

thunderforest_Transport.addTo(map);
map.attributionControl.setPrefix(''); // Don't show the 'Powered by Leaflet' text.

 map.on('click', onMapClick);



//drawing objects
for (var i = 0; i < routes.length; i++) {
  drawRoute(routes[i]);
}
for( let i = 0; i<stations.length; ++i){
                  drawStation(i);
}


function drawStation(i) {
  var a = new L.circle(stations[i][0], {  //coordinates
  color: `${hsl_col_perc(stations[i][2], green, red)}`, //congestion value
  fillColor: `${hsl_col_perc(stations[i][2], green, red)}`,
  fillOpacity: 0.1,
  radius: 500
  });

  var tooltip = L.tooltip({
          direction: 'center',
          permanent: true,
          interactive: true,
          noWrap: true,
          opacity: 0.9
      });

  a.bindTooltip(stations[i][1],tooltip);
  //a.bindPopup(stations[i][1]);  //adding popup with name
  a.addTo(map);

  a.on('click', onClickCircles);
  a.on('mouseover', highlightFeature);
  a.on('mouseout', resetHighlight);

  visibleStations.push(a);
}

//draw routes
function drawRoute(points) {
  var route = new L.Polyline(points, {
      color: 'black',
      weight: 10,
      opacity: 1,
      smoothFactor: 1

      });

  visibleroutes.push(route);

  map.addLayer(route);

}
//clear objects
function clearObjects(objects) {
  for (var i = 0; i < objects.length; i++) {
      map.removeLayer(objects[i]);
  }
}
