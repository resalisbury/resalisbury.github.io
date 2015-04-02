console.log("hello");
// getLocation();
console.log(myLatLng);
google.maps.event.addDomListener(window, 'load', initialize);

var map;
var infowindow;
var latitude;
var longitude;
var myLatLng;


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
  getLocation();
  // var pyrmont = new google.maps.LatLng(37.7613981, -122.40302159999999);

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

