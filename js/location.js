console.log("hello")
getLocation();
google.maps.event.addDomListener(window, 'load', initialize);

var map;
var infowindow;
var latitude;
var longitude;


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
}

function initialize() {
  var pyrmont = new google.maps.LatLng(37.7613981, -122.40302159999999);

  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: pyrmont,
    zoom: 11
  });

  var request = {
    location: pyrmont,
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
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

