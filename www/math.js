//MATH
function hsl_col_perc(percent, start, end) {
<<<<<<< HEAD
  if(percent > 100)
      percent = 100;
=======

  if(percent > 100)
    percent = 100;

>>>>>>> a4ed0184a9ac68b7fbde265070890039f4a19a49
  var a = percent / 100,
      b = (end - start) * a,
      c = b + start;

  // Return a CSS HSL string
  return 'hsl('+c+', 100%, 50%)';
}


function getAvgCoord(routePoints) {
  var lat = 0.0;
  var lng = 0.0;

  for (var i = 0; i < routePoints.length; i++) {
    lat += routePoints[i].lat;
    lng += routePoints[i].lng;
  }

  lat /= routePoints.length;
  lng /= routePoints.length;

  return new L.LatLng(lat, lng);
}
