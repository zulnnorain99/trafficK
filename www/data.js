//stations


var waterloo_london_coord = new L.LatLng(51.5031653, -0.1144938);
var clapham_junction_main_coord = new L.LatLng(51.4636882,  -0.1712424);
var vauxhall_main_coord = new L.LatLng(51.486183, -0.122860);
var wimbledon_coord = new L.LatLng(51.4214158, -0.2075719);
var surbition_coord = new L.LatLng(51.3947441, -0.3063072);
var liphook_coord = new L.LatLng(51.071556, -0.800071);
var walton_on_thames_coord = new L.LatLng(51.372999, -0.414313);
var rowlands_castle_coord = new L.LatLng(50.892427, -0.957471);
var petersfield_coord = new L.LatLng(51.006666, -0.941297);
var earlsfield_coord = new L.LatLng(51.442399, -0.187730);
var hilsea_coord = new L.LatLng(50.828442, -1.058773);
var guildford_coord = new L.LatLng(51.236873, -0.580211);
var bedhampton_coord = new L.LatLng(50.854024, -0.996437);
var worplesdon_coord = new L.LatLng(51.288205, -0.582492);
var woking_coord = new L.LatLng(51.318505, -0.557043);
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
var liss_coord = new L.LatLng(51.043656, -0.892767);
var weybridge_coord = new L.LatLng(51.361804, -0.457853);
var farncombe_coord = new L.LatLng(51.197198, -0.604523);




{'LIPHOOK', 'WALTON ON THAMES', 'ROWLANDS CASTLE', 'PETERSFIELD', 'WIMBLEDON (WESSEX SIDE)', 'EARLSFIELD', 'HILSEA', 'GUILDFORD', 'BEDHAMPTON', 'WORPLESDON',
 'LONDON WATERLOO', 'WOKING', 'BYFLEET AND NEW HAW', 'PORTSMOUTH AND SOUTHSEA', 'HAVANT', 'GODALMING', 'FRATTON', 'VAUXHALL (MAIN)', 'HERSHAM', 'HASLEMERE',
 'WEST BYFLEET', 'MILFORD', 'CLAPHAM JUNCTION MAIN (9-11)', 'SURBITON', 'PORTSMOUTH HARBOUR', 'WITLEY', 'ESHER', 'LISS', 'WEYBRIDGE', 'FARNCOMBE'}



var stations = {'LIPHOOK':[liphook_coord,"Liphook",0],
                'WALTON ON THAMES':[walton_on_thames_coord,"Walton on Thames",0],
                'ROWLANDS CASTLE':[rowlands_castle_coord,"Rowland's Castle",0],
                'PETERSFIELD':[petersfield_coord,"Petersfield",0],
                'WIMBLEDON (WESSEX SIDE)':[wimbledon_coord,"Wimbledon",0],
                'EARLSFIELD':[earlsfield_coord,"Earlsfield",0],
                'HILSEA':[hilsea_coord,"Hilsea",0],
                'GUILDFORD':[guildford_coord,"Guildford",0],
                'BEDHAMPTON':[bedhampton_coord,"Bedhampton",0],
                'WORPLESDON':[worplesdon_coord,"Worplesdon",0],
                'LONDON WATERLOO':[waterloo_london_coord,"Waterloo",0],
                'WOKING':[woking_coord,"Woking", 0],
                'BYFLEET AND NEW HAW':[byfleet_and_new_haw_coord,"Byfleet & New Haw",0],
                'PORTSMOUTH AND SOUTHSEA':[portsmouth_and_southsea_coord,"Portsmouth & Southsea",0],
                'HAVANT':[havant_coord, "Havant", 0],
                'GODALMING':[godalming_coord,"Godalming",0],
                'FRATTON':[fratton_coord,"Fratton",0],
                'VAUXHALL (MAIN)':[vauxhall_main_coord,"Vauxhall",0],
                'HERSHAM':[hersham_coord,"Hersham",0],
                'HASLEMERE':[haslemere_coord,"Haslemere",0],
                'WEST BYFLEET':[west_byfleet_coord,"West Byfleet",0],
                'MILFORD':[milford_coord,"Milford",0],
                'SURBITON':[surbition_coord,"Surbiton",0],
                'PORTSMOUTH HARBOUR':[portsmouth_harbour_coord,"Portsmouth Harbour",0],
                'WITLEY':[witley_coord,"Witley",0],
                'ESHER':[esher_coord,"Esher",0],
                'LISS':[liss_coord,"Liss",0],
                'WEYBRIDGE':[weybridge_coord,"Weybrdge",0],
                'FARNCOMBE':[farncombe_coord,"Farncombe",0]};

var journeysByHeadCode = {};
var journeysByStation = {};
function Journey (headCode, date, origin, destination, station, movementCategory, actualIn, actualOut, expectedIn, expectedOut, delaySecs ){
  this.headCode = headCode;
  this.date = date;
  this.origin = origin;
  this.destination = destination;
  this.station = station;
  this.movementCategory = movementCategory;
  this.actualIn = actualIn;
  this.actualOut = actualOut;
  this.expectedIn = expectedIn;
  this.expectedOut = expectedOut;

  this.delaySecs = parseInt(delaySecs);
}

var allPoints = [];

for (var station in stations) {
  allPoints.push(stations[station][0]);
}

parse = function(line){
  line = line.split(",");
  journey = new Journey(line[0],line[2],line[4],line[5],line[6],line[7],line[8],line[9],line[10],line[11],line[16]);
  if(journeysByStation[journey.station]){
    journeysByStation[journey.station].push(journey);
  }else{
  journeysByStation[journey.station] = [journey]}

  if(journeysByHeadCode[journey.headCode]){
    journeysByHeadCode[journey.headCode].push(journey);
  }else{
    journeysByHeadCode[journey.headCode] = [journey];
  }
}

//routes
var journeyRoutes = {};

function getRoutes (){
  for(headCode in journeysByHeadCode){
    var stationArray = [];
    for(var i = 0; i< journeysByHeadCode[headCode].length; i++){

      if(journeysByHeadCode[headCode][i].station && !stationArray.includes(stations[journeysByHeadCode[headCode][i].station][0])){
        stationArray.push(stations[journeysByHeadCode[headCode][i].station][0]);
      }
    }
    journeyRoutes[headCode] = stationArray;
  }
}

function setDelays(){
  for(station in stations){
    var avg = calAvg(journeysByStation[station]);
    // console.log(avg);
    stations[station][2] = (avg*100)/30;
  //  console.log(avg);
  //  console.log( (avg*100) / 30);

  }
}
function calAvg(journeys){
  if(!journeys) return 13;
  sum = 0;
  //  console.log(journeys);
  for(var i =0; i< journeys.length; i++){
    journey = journeys[i];
  //  console.log(journey);

    sum+= parseInt(journey.delaySecs);
  }
  ////console.log("AVG IS ",sum,journey.delaySecs,journeys.length);
  return sum/journeys.length;
}
