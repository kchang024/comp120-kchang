var map;

function initMap() {

  // Location of South Station, Boston, MA
  var southStation = new google.maps.LatLng(42.352271, -71.05524200000001);

  // The map, centered on South Station
  map = new google.maps.Map(document.getElementById('map'), {
        center: southStation,
        zoom: 13
        });

  // Marker for South Station
  var centerMarker = new google.maps.Marker({
    position: southStation, 
    map: map
  });

  // Car icon for display in Google Maps
  var icons = {
    car: {
      name: 'Car',
      icon: 'car.png'
    }
  };

  var carLocations = [
  { 
    position: new google.maps.LatLng(42.3453, -71.0464),
    type: 'car'
  }, {
    position: new google.maps.LatLng(42.3662, -71.0621),
    type: 'car'
  }, {
    position: new google.maps.LatLng(42.3603, -71.0547),
    type: 'car'
  }, {
    position: new google.maps.LatLng(42.3472, -71.0802),
    type: 'car'
  }, {
    position: new google.maps.LatLng(42.3663, -71.0544),
    type: 'car'
  }, {
    position: new google.maps.LatLng(42.3542, -71.0704),
    type: 'car'
  }
  ];

  carLocations.forEach(function(carLocations) {
    var marker = new google.maps.Marker ( {
      position: carLocations.position,
      icon : icons[carLocations.type].icon,
      map: map
    });
  });

}
   

