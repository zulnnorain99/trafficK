var mymap = L.map('mapid').setView([51.505, -0.09], 13);
mymap.invalidateSize();
L.tileLayer(
'https://api.mapbox.com/styles/v1/mapbox/emerald-v8/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGFuaWxvLWRlbGJ1c3NvIiwiYSI6ImNqb2FtMm5oZzAzdmozcGw3aGJ1c3JpbHoifQ.9bU3Ql7zJvo3VsEQidcMNg', {
   tileSize: 512,
   zoomOffset: -1,
   attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);

mymap.invalidateSize();

var waterloo
