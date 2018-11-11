////console//colors in hsl_col_perc

const red = 0,
      yellow = 60,
      green = 120,
      turquoise = 180,
      blue = 240,
      pink = 300;


  document.getElementById("search_bar_box").innerHTML = html;

var stationsNames = Object.keys(stations);

var currentStation = "empty";

 var asd = [];
function getKeys(dict){
var keys = [];
  for(key in dict){
    keys.push(key)
  }
  return keys;
}

function LoadFile() {
  var oFrame = document.getElementById("frmFile");
  var strRawContents = oFrame.contentWindow.document.body.childNodes[0].innerHTML;
  while (strRawContents.indexOf("\r") >= 0)
      strRawContents = strRawContents.replace("\r", "");
  var arrLines = strRawContents.split("\n");
  for (var i = 1; i < arrLines.length; i++) {
      var curLine = arrLines[i];
      parse(curLine);
  }
  setDelays();
  asd = getKeys(journeysByHeadCode);
  asd = asd.concat(getKeys(stations));
  getRoutes();
  autocomplete(document.getElementById("myInput"), [asd]  );

  for(station in stations){
    stations[station].push(station)
    //////console.log(stations[station]);
  }
  for (var station in stations) {
    drawStation(station);
  }

  //console.log("LOADED")


}




//initialisation.
var map = L.map('mapid').setView([51.330137, -0.386452], 9);

var visibleroutes = [];
var visibleStations = [];
var visibleCities = [];

map.invalidateSize();
var thunderforest_Transport = L.tileLayer('https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=c4fdde49b9a14b189c0fc231906018e5', {
	attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	apikey: 'c4fdde49b9a14b189c0fc231906018e5',
	maxZoom: 22
});


//map.setStyle({ zoomControl:false });
thunderforest_Transport.addTo(map);
map.attributionControl.setPrefix(''); // Don't show the 'Powered by Leaflet' text.




function drawStation(station) {


  var st_key = 'WATERLOO'
  var keys = Object.keys(journeysByStation);


  console.log(keys);

  for (var i = 0; i < keys.length; i++) {
    if(stations[keys[i]] == station){
      st_key = keys[i];
      break;
    }
  }

  console.log(st_key);
  var a = new L.circle(stations[station][0], {  //coordinates
  color: `${hsl_col_perc((
    (getDelayAvg(journeysByStation[station]) * 100) / 30),
     green, red)}`, //congestion value
  fillColor: `${hsl_col_perc((
    (getDelayAvg(journeysByStation[station]) * 100) / 30),
     green, red)}`,
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
function drawRoute(points, headCode , station = undefined) {
  var route = new L.Polyline(points, {
      color: '#00a',
      weight: 10,
      opacity: 1,
      smoothFactor: 1

      });
      clearObjects(visibleroutes);

  visibleroutes.push(route);

  map.addLayer(route);

  map.setView(getAvgCoord(points),11);
   var htmlToInject = `<style>*
{
    padding: 0;
    margin: 0;
}
#over
{
    position:absolute;
    width:100%;
    height:100%;
    text-align: center; /*handles the horizontal centering*/
}
/*handles the vertical centering*/
.Centerer
{
    display: inline-block;
    height: 100%;
    vertical-align: middle;
}
.Centered
{
    display: inline-block;
    vertical-align: middle;
}
ul {
    margin: 20px;
}

.input-color {
    position: relative;
}
.input-color input {
    padding-left: 20px;
}
.input-color .color-box {
    width: 25px;
    height: 25px;
    display: inline-block;
    background-color: #ccc;
    position: absolute;
    left: 5px;
    top: 5px;
}
</style>`
;

   htmlToInject += `
  <div id="over">
  <img class="Centered" width="250px" height="200px" src = "stations/${currentStation}.png"> </img>
</div>

</br></br></br></br></br></br></br></br></br></br></br></br>


<center>
`;



if(station && station != journeysByHeadCode[headCode][0].destination){


  htmlToInject+=
  `
<h1>${journeysByHeadCode[headCode][0].origin} ⇨ ${journeysByHeadCode[headCode][0].destination}</h1>
</center>
  `}else if(station && station == journeysByHeadCode[headCode][0].destination){
    htmlToInject+=`
    <h1>TERMINATES HERE</h1>
    </center>
      `;
  }else{
    htmlToInject+=`
    <h1>${journeysByHeadCode[headCode][0].origin}⇨ ${journeysByHeadCode[headCode][0].destination}</h1>
    </center>
      `;
  };


var count = 0;

  for (var i =  journeysByHeadCode[headCode].length-50; i < journeysByHeadCode[headCode].length; i++) {

    var jrny =  journeysByHeadCode[headCode][i];
    if(station && station == journeysByHeadCode[headCode][0].destination && jrny.actualOut) continue;
  if(station && station == journeysByHeadCode[headCode][0].destination) {
    htmlToInject += `

    <div class = "input-color">

                        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<img src = "train.png"></img>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        <a  onclick="showCCTV()"  href="#">
                          <font size="+2">
                            <b>Date: ${jrny.date} | Arrival Time: ${jrny.actualIn.split(" ")[1]}</b>
                            <div class="color-box" style="background-color: ${hsl_col_perc(
                              ((journeysByHeadCode[headCode][i].delaySecs * 100) / 30),


                               green, red)};"></div>
                          </font>
                            </a>
                          </div>

                      `;
                      count++;
                      if(count > 7) break;
  }
  else{
    if(!jrny.actualIn || !jrny.actualOut || !jrny.expectedOut|| !jrny.expectedIn || !jrny.delaySecs) continue;
    htmlToInject += `<div class = "input-color">
                  `;
                      htmlToInject+=`
                        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<img src = "train.png"></img>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        <a onclick="showCCTV()"   href="#">
                          <font size="+2">
                            <b>Date: ${jrny.date} | Arrival: ${jrny.actualIn.split(" ")[1]} | ETA:${jrny.expectedIn.split(" ")[1]} | Departure: ${jrny.actualOut.split(" ")[1]} | ETD: ${jrny.expectedOut.split(" ")[1]}</b>
                            <div class="color-box" style="background-color: ${hsl_col_perc(
                              ((journeysByHeadCode[headCode][i].delaySecs * 100) / 30),


                               green, red)};"></div>
                          </font>
                            </a>
                          </div>

                      `;
  }
    count++;
    if(count > 6) break;

  }

console.log(htmlToInject);

document.getElementById("detailsId").innerHTML = htmlToInject;
}
//clear objects
function clearObjects(objects) {
  for (var i = 0; i < objects.length; i++) {
      map.removeLayer(objects[i]);
  }
}

function zoomOnStation(stationValue) {

    clearObjects(visibleStations);
      for (var station in stations) {
        drawStation(station);
  }
  clearObjects(visibleroutes);
  var latlng = stationValue[0];
  map.setView(latlng, 13);

  currentStation = stationValue[1];

  showStationDetails(stationValue);
}

function saveReport(){
var report = window.prompt("Enter the circumstance:");
alert(`Report saved: ${report}`);
}

function showStationDetails(stationValue) {



  var dwellingStatus = (stationValue[2]*100) / 30;
  if(dwellingStatus > 100){
    dwellingStatus = 100;
  }
  routes = [];
  origin = [];
  destination = [];
  console.log(journeysByStation[stationValue[3]])

  for (var i= 0; i < journeysByStation[stationValue[3]].length; i++){

    journey = journeysByStation[stationValue[3]][i]
    if(!origin.includes(journey.origin)&&!destination.includes(journey.destination)){
    routes.push(journey.headCode);
    origin.push(journey.origin)
    destination.push(destination.origin)

    //console.log(journey.headCode,"WAS NOT INCLUDED")
  }
  }


  var htmlToInject = `<style>*
{
    padding: 0;
    margin: 0;
}
#over
{
    position:absolute;
    width:100%;
    height:100%;
    text-align: center; /*handles the horizontal centering*/
}
/*handles the vertical centering*/
.Centerer
{
    display: inline-block;
    height: 100%;
    vertical-align: middle;
}
.Centered
{
    display: inline-block;
    vertical-align: middle;
}
ul {
    margin: 20px;
}

.input-color {
    position: relative;
}
.input-color input {
    padding-left: 20px;
}
.input-color .color-box {
    width: 25px;
    height: 25px;
    display: inline-block;
    background-color: #ccc;
    position: absolute;
    left: 5px;
    top: 5px;
}
</style>`
;

   htmlToInject += `
  <div id="over">
  <img class="Centered" width="250px" height="200px" src = "stations/${currentStation}.png"> </img>
</div>

</br></br></br></br></br></br></br></br></br></br></br></br>

<div class="w3-light-grey w3-round-xlarge">
 <div class="w3-container w3-blue w3-round-xlarge" style="width:${dwellingStatus}%">${parseFloat(dwellingStatus).toFixed(1)}%</div>
</div>
<center>

<h1>CURRENT ROUTES</H1>
</center>
  `;




  for (var i = 0; i < routes.length; i++) {
    htmlToInject += `                    ${routes[i]}
<div class = "input-color">

                        <a onclick="drawRoute(journeyRoutes['${routes[i]}'],'${routes[i]}','${stationValue[3]}')" href="#">
                          <font size="+2.5">
                            <b>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${journeysByHeadCode[routes[i]][0].origin} ⇨ ${journeysByHeadCode[routes[i]][0].destination}</b>

                            <div class="color-box" style="background-color: ${hsl_col_perc((
                              (getDelayAvg(journeysByHeadCode[routes[i]]) * 100) / 30),
                               green, red)};"></div>
                          </font>
                            </a>
                          </div>

                      `;

  }
htmlToInject +=`  <div class = "input-color">
  <a onclick="saveReport()" href="#">
    <font size="+2">
      <b>+ Report circumstance</b>`;

  htmlToInject += `  <div id="over"><a href ='#'   onclick="showCCTV()">
    <img class="Centered" width="50px" height="50px" src = "cctv.jpg"> </img>
    </a>
  </div>`






  document.getElementById("detailsId").innerHTML = htmlToInject;
  //console.log(currentStation);
}

function getDelayAvg(journeys){
  console.log(journeys)
  var delaySum =0;
  for(var i=0; i< journeys.length; i++){
    var jny = journeys[i];
    delaySum += jny.delaySecs;
  }
  return delaySum/journeys.length;
}
function showCCTV() {
var htmlToInject = `<style>#wrapper {
    width: 920px;
    height: auto;
    margin: 0 auto;
}
#home1 {
    width: 47.5%;
    height: 300px;
    float: left;
    margin-right: 5%;
}

#home2 {
    width: 47.5%;
    height: 300px;
    float: left;
}

.clear{
    clear: both;
}

@media (max-width:767px) {
    #wrapper{
        width: 100%;
        height: auto;
    }
    #home1 {
        width: 100%;
        height: auto;
        float: none;
    }
    #home2 {
        width: 100%;
        height: auto;
        float: none;
    }
}</style>`;


htmlToInject += `<div >
                    <img height="200px" src = "cctv_big.png"></img>
                    <img height="200px" src = "download.png"></img>

                    </div>`;


htmlToInject += `
<video loop autoplay width="400" height="225">
  <source src="cctv/cam4.m4v" type="video/mp4">
</video>

</br>
<font face="Consolas">

CAM #001 - <b>WILTON-ROADS-EXITS</b>
</font>
</br>

`



;
htmlToInject+=`<video loop autoplay width="400" height="225">
  <source src="cctv/cam3.m4v" type="video/mp4">
</video>
</br>
<font face="Consolas">

CAM #002 - <b>PLATFORM-2</b>

<font>
</br>
`;
htmlToInject+=`<video loop autoplay width="400" height="225">
  <source src="cctv/cam15.mp4" type="video/mp4">
</video></br>
<font face="Consolas">

CAM #003 - <b>TCKT-OFFICE</b>

</font>
</br>
`;
/*
htmlToInject+=`<video loop autoplay width="400" height="225">
  <source src="cctv/gate.m4v" type="video/mp4">
</video></br>
<font face="Consolas">

CAM #004 - <b>GATE</b>
</font>`;*/


document.getElementById("detailsId").innerHTML = htmlToInject;
}

function onClickCircles(e) {
  ////console.log("clicked");
    clearObjects(visibleroutes);

    var latlng = e.target.getLatLng();
    var s = getStationFromCircle(latlng);
    zoomOnStation(s);




}

function getStationFromCircle(latlng) {
  for ( station in stations) {
    ////console.log(station)
  var s = stations[station];

        if(s[0] == latlng){
          return s;

    }
  }
}



function autocomplete(inp, arrayofcontent) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      for (j= 0; j < arrayofcontent.length; j++) {
      /*for each item in the array...*/
      for (i = 0; i < arrayofcontent[j].length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arrayofcontent[j][i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arrayofcontent[j][i].substr(0, val.length) + "</strong>";
          b.innerHTML += arrayofcontent[j][i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arrayofcontent[j][i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;

              console.log(inp.value);
              if(stations[inp.value])
                zoomOnStation(stations[inp.value]);
              else {
                drawRoute(journeyRoutes[inp.value], inp.value);
              }

              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}
