//stations


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

var allPoints = [];
for (var i = 0; i < stations.length; i++) {
  allPoints.push(stations[i][0]);
}

//routes
var route1_points = [waterloo_london_coord,vauxhall_london_coord, clapham_junction_london_coord,earlsfield_coord];


var routes = [route1_points];
