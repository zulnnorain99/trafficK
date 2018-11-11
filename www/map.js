//colors in hsl_col_perc

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
    ////console.log(stations[station]);
  }

  console.log("LOADED")


}




//initialisation.
var map = L.map('mapid').setView([51.5074, -0.1278], 9);

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

lndn.on('click', onClickCity);
lndn.on('mouseover', highlightFeature);
lndn.on('mouseout', resetHighlight);

visibleStations.push(lndn);



var prts = new L.circle([50.797297, -1.107672], {  //coordinates
color: `${hsl_col_perc(100, green, red)}`, //congestion value
fillColor: `${hsl_col_perc(100, green, red)}`,
fillOpacity: 0.8,
radius: 5000
});

var tooltip = L.tooltip({
        direction: 'center',
        permanent: true,
        interactive: true,
        noWrap: true,
        opacity: 0.9
    });

prts.bindTooltip("Portsmouth",tooltip);
//lndn.bindPopup(stations[i][1]);  //adding popup with name
prts.addTo(map);

prts.on('click', onClickCity);
prts.on('mouseover', highlightFeature);
prts.on('mouseout', resetHighlight);

visibleStations.push(prts);




//drawing objects

/*for (var i = 0; i < routes.length; i++) {
//  drawRoute(routes[i]);
}*/


/*for( var station in stations){
                  drawStation(station);
}*/


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
      clearObjects(visibleroutes);

  visibleroutes.push(route);

  map.addLayer(route);

  map.setView(getAvgCoord(points),11);

}
//clear objects
function clearObjects(objects) {
  for (var i = 0; i < objects.length; i++) {
      map.removeLayer(objects[i]);
  }
}

function zoomOnStation(stationValue) {
  if(visibleStations.includes(lndn || prts)){
    clearObjects(visibleStations);
      for (var station in stations) {
        drawStation(station);
      }
  }
  clearObjects(visibleroutes);
  var latlng = stationValue[0];
  map.setView(latlng, 13);

  currentStation = stationValue[1];

  showStationDetails(stationValue);
}



function showStationDetails(stationValue) {



  dwellingStatus = (stationValue[2]*100) / 30;
  if(dwellingStatus > 100){
    dwellingStatus = 100;
  }
  routes = [];
  origin = [];
  destination = [];
  for (var i= 0; i < journeysByStation[stationValue[3]].length; i++){

    journey = journeysByStation[stationValue[3]][i]
    if(!origin.includes(journey.origin)&&!destination.includes(journey.destination)){
    routes.push(journey.headCode);
    origin.push(journey.origin)
    destination.push(destination.origin)

    console.log(journey.headCode,"WAS NOT INCLUDED")
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
}</style>`
;

   htmlToInject += `
  <div id="over">
  <img class="Centered" width="250px" height="200px" src = "stations/${currentStation}.png"> </img>
</div>

</br></br></br></br></br></br></br></br></br></br></br></br>

<div class="w3-light-grey w3-round-xlarge">
 <div class="w3-container w3-blue w3-round-xlarge" style="width:${dwellingStatus}%">${dwellingStatus}%</div>
</div>

  `;

  for (var i = 0; i < routes.length; i++) {
    htmlToInject += `<a href="#"><div>

                        <img src = "route.png"></img>
                          <font size="+2">
                            <b>${journeysByHeadCode[routes[i]][0].origin} - ${journeysByHeadCode[routes[i]][0].destination}</b>
                          </font>

                          </div>
                      </a>
                      `;
  }






  document.getElementById("detailsId").innerHTML = htmlToInject;
  console.log(currentStation);
}

function onClickCircles(e) {
  console.log(currentStation);
    clearObjects(visibleroutes, e);
  //  zoomOnStation();


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

              //console.log(inp.value);
              if(stations[inp.value])
                zoomOnStation(stations[inp.value]);
              else {
                drawRoute(journeyRoutes[inp.value]);
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
