//colors in hsl_col_perc

const red = 0,
      yellow = 60,
      green = 120,
      turquoise = 180,
      blue = 240,
      pink = 300;


//events


//initialisation
var mymap = L.map('mapid').setView([51.505, -0.09], 13);
popup = new L.Popup();


mymap.invalidateSize();
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            maxZoom: 18
         }).addTo(mymap);
         mymap.attributionControl.setPrefix(''); // Don't show the 'Powered by Leaflet' text.

 mymap.on('click', onMapClick);

//markers


var waterloo_london = new L.LatLng(51.5031653, -0.1144938);
var clapham_junction_london = new L.LatLng(51.4636882,  -0.1712424);
var vauxhall_london = new L.LatLng(51.4860794,0.1249695);
var wimbledon = new L.LatLng(51.4350182, -0.2154541);
var surbition = new L.LatLng(51.3947441, -0.3063072);
var richmond= new L.LatLng(51.4632698, -0.3038939);
var raynes_park = new L.LatLng(51.4031940, -0.2427977);
var earlsfield = new L.LatLng(51.442112, -0.1897404);



var a_points = [waterloo_london, clapham_junction_london];
var b_points = [clapham_junction_london, vauxhall_london];
var c_points = [vauxhall_london, wimbledon];
var d_points = [wimbledon, surbition];
var e_points = [surbition, richmond];
var f_points = [richmond, raynes_park];
var g_points = [raynes_park, earlsfield];


var stations = [waterloo_london, clapham_junction_london,
                vauxhall_london, wimbledon,
                surbition, richmond,
                raynes_park, earlsfield];

var a_perc = 100;
var b_perc = 100;
var c_perc = 100;
var d_perc = 100;
var e_perc = 100;
var f_perc = 100;
var g_perc = 100;


for( let i = 0; i<stations.length; ++i){
var a = new L.circle(stations[i], {
color: `${hsl_col_perc(a_perc, green, red)}`,
fillColor: '#f03',
fillOpacity: 0.5,
radius: 500
});

a.addTo(mymap);
}







function hsl_col_perc(percent, start, end) {
var a = percent / 100,
    b = (end - start) * a,
    c = b + start;

// Return a CSS HSL string
return 'hsl('+c+', 100%, 50%)';
}


function onMapClick(e) {
    mymap.setView([51, 0], 13);
}
