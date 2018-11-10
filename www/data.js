//stations


var waterloo_london_coord = new L.LatLng(51.5031653, -0.1144938);
var clapham_junction_main_coord = new L.LatLng(51.4636882,  -0.1712424);
var vauxhall_main_coord = new L.LatLng(51.486183, -0.122860);
var wimbledon_coord = new L.LatLng(51.4214158, -0.2075719);
var surbition_coord = new L.LatLng(51.3947441, -0.3063072);
var richmond_coord= new L.LatLng(51.4632698, -0.3038939); n
var raynes_park_coord = new L.LatLng(51.4088525, -0.2323602); n

var liphook_coord = new L.LatLng(51.071556, -0.800071);
var walton_on_thames_coord = new L.LatLng(51.372999, -0.414313);
var rowlands_castle_coord = new L.LatLng(50.892427, -0.957471);
var petersfield_coord = new L.LatLng(51.006666, -0.941297);
var earlsfield_coord = new L.LatLng(51.442399, -0.187730);
var hilsea_coord = new L.LatLng(50.828442, -1.058773);
var guildford_coord = new L.LatLng(51.236873, -0.580211);
var bedhampton_coord = new L.LatLng(50.854024, -0.996437);
var worplesdon_coord = new L.LatLng(51.288205, -0.582492);
var woking = new L.LatLng(51.318505, -0.557043);
var byfleet_and_new_haw_coord = new L.LatLng(51.349983, -0.481260);
var portsmouth_and_southsea_coord = new L.LatLng(50.798584, -1.090677);
var havant_coord = new L.LatLng(50.854378, -0.981613);
var godalming_coord = new L.LatLng(51.186638, -0.618771);
var fratton_coord = new L.LatLng(50.796582, -1.073817);
var hersham_coord = new L.LatLng(51.377069, -0.389678);
var haslemere_coord = new L.LatLng(51.088807, -0.719277);
var west_byfleet_coord = new L.LatLng(51.339707, -0.505448);
var milford_coord = new L.LatLng(51.163398, -0.636978);
var portsmouth_harbour_coord = new L.LatLng(50.797297, -1.107672);
var witley_coord = new L.LatLng(51.133115, -0.645791);
var esher_coord = new L.LatLng(51.379908, -0.352740);




{'LIPHOOK', 'WALTON ON THAMES', 'ROWLANDS CASTLE', 'PETERSFIELD', 'WIMBLEDON (WESSEX SIDE)', 'EARLSFIELD', 'HILSEA', 'GUILDFORD', 'BEDHAMPTON', 'WORPLESDON',
 'LONDON WATERLOO', 'WOKING', 'BYFLEET & NEW HAW', 'PORTSMOUTH & SOUTHSEA', 'HAVANT', 'GODALMING', 'FRATTON', 'VAUXHALL (MAIN)', 'HERSHAM', 'HASLEMERE',
 'WEST BYFLEET', 'MILFORD', 'CLAPHAM JUNCTION MAIN (9-11)', 'SURBITON', 'PORTSMOUTH HARBOUR', 'WITLEY', 'ESHER', 'LISS', 'WEYBRIDGE', 'FARNCOMBE'}

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



//routes
var route1_points = [waterloo_london_coord,vauxhall_london_coord, clapham_junction_london_coord,earlsfield_coord];


var routes = [route1_points];
