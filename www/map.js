//colors in hsl_col_perc

const red = 0,
      yellow = 60,
      green = 120,
      turquoise = 180,
      blue = 240,
      pink = 300;


//events


//initialisation
var mymap = L.map('mapid').setView([51.462252, -0.106578], 12);



mymap.invalidateSize();
var thunderforest_Transport = L.tileLayer('https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=c4fdde49b9a14b189c0fc231906018e5', {
	attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	apikey: 'c4fdde49b9a14b189c0fc231906018e5',
	maxZoom: 22
});

//mymap.setStyle({ zoomControl:false });

thunderforest_Transport.addTo(mymap);




mymap.attributionControl.setPrefix(''); // Don't show the 'Powered by Leaflet' text.

 mymap.on('click', onMapClick);

//markers


var waterloo_london_coord = new L.LatLng(51.5031653, -0.1144938);
var clapham_junction_london_coord = new L.LatLng(51.4636882,  -0.1712424);
var vauxhall_london_coord = new L.LatLng(51.486183, -0.122860);
var wimbledon_coord = new L.LatLng(51.4214158, -0.2075719);
var surbition_coord = new L.LatLng(51.3947441, -0.3063072);
var richmond_coord= new L.LatLng(51.4632698, -0.3038939);
var raynes_park_coord = new L.LatLng(51.4088525, -0.2323602);
var earlsfield_coord = new L.LatLng(51.442112, -0.1897404);


var waterloo_london = [waterloo_london_coord, "Waterloo London", 100];
var clapham_junction_london = [clapham_junction_london_coord, "Clapham Junction London",50];
var vauxhall_london = [vauxhall_london_coord, "Vauxhall London",100];
var wimbledon = [wimbledon_coord, "Wimbledon",10];
var surbition = [surbition_coord, "Surbition",79];
var richmond = [richmond_coord, "Richmond",0];
var raynes_park = [raynes_park_coord, "Raynes Park",35];
var earlsfield = [earlsfield_coord, "Earlsfield",12];




var stations = [waterloo_london, clapham_junction_london,
                vauxhall_london, wimbledon,
                surbition, richmond,
                raynes_park, earlsfield];



for( let i = 0; i<stations.length; ++i){

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
a.addTo(mymap)

a.on('click', onClickCircles);
a.on('mouseover', highlightFeature);
a.on('mouseout', resetHighlight);

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


    mymap.fitBounds(e.target.getBounds());
    var circle = e.target;
    circle.setStyle({  //coordinate
    });
}






function hsl_col_perc(percent, start, end) {
var a = percent / 100,
    b = (end - start) * a,
    c = b + start;

// Return a CSS HSL string
return 'hsl('+c+', 100%, 50%)';
}


function onMapClick(e) {
    //mymap.setView([51, 0], 13);
}
