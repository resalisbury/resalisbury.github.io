var map;
var infowindow;
var latitude;
var longitude;
var myLatLng;

console.log("hello");
getLocation();
window.setTimeout(initialize, 3000);
console.log(myLatLng);




function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setLatLong);
    } else {
        window.alert("Geolocation is not supported by this browser.");
    }
}

function setLatLong(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  myLatLng = new google.maps.LatLng(latitude, longitude);
  var myLocation = new google.maps.Marker({
    position: myLatLng,
    map: map,
  });
}

function initialize() {
  // var centerMap = new google.maps.LatLng(lat, longit);
  myLatLng = new google.maps.LatLng(37.784586999999995, -122.397551);

  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: myLatLng,
    zoom: 12
  });

  var request = {
    location: myLatLng,
    radius: 8000,
    types: ['bar'],
    open_now: 'true',
  };
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var image = './imgs/beer_icon.png';
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: image
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name + ", " + place.rating + " stars");
    infowindow.open(map, this);
  });
}

