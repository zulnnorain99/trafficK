//colors in hsl_col_perc

const red = 0,
      yellow = 60,
      green = 120,
      turquoise = 180,
      blue = 240,
      pink = 300;


  document.getElementById("search_bar_box").innerHTML = html;


//initialisation
var map = L.map('mapid').setView([51.5074, -0.1278], 9);

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




//drawing london big circle
var lndn = new L.circle([51.5074, -0.1278], {  //coordinates
color: `${hsl_col_perc(100, green, red)}`, //congestion value
fillColor: `${hsl_col_perc(100, green, red)}`,
fillOpacity: 0.8,
radius: 10000
});

var tooltip = L.tooltip({
        direction: 'center',
        permanent: true,
        interactive: true,
        noWrap: true,
        opacity: 0.9
    });

lndn.bindTooltip("London",tooltip);
//lndn.bindPopup(stations[i][1]);  //adding popup with name
lndn.addTo(map);

lndn.on('click', onClickLondon);
lndn.on('mouseover', highlightFeature);
lndn.on('mouseout', resetHighlight);

visibleStations.push(lndn);


//drawing objects

/*for (var i = 0; i < routes.length; i++) {
//  drawRoute(routes[i]);
}*/


for( var station in stations){
                  drawStation(station);
}


function drawStation(station) {
  var a = new L.circle(stations[station][0], {  //coordinates
  color: `${hsl_col_perc(stations[station][2], green, red)}`, //congestion value
  fillColor: `${hsl_col_perc(stations[station][2], green, red)}`,
  fillOpacity: 0.8,
  radius: 500
  });

  var tooltip = L.tooltip({
          direction: 'center',
          permanent: true,
          interactive: true,
          noWrap: true,
          opacity: 0.9
      });

  a.bindTooltip(stations[station][1],tooltip);
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
      color: '#00a',
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
