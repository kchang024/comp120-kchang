var map;
var myLat = 0;
var myLng = 0;
var infowindow = new google.maps.InfoWindow();

function initMap() {

  // Location of South Station, Boston, MA
  var myLocation = new google.maps.LatLng(myLat, myLng);

  getLocation();
  // The map, centered on South Station
  map = new google.maps.Map(document.getElementById('map'), {
        center: myLocation,
        zoom: 13
        });

  // // Marker for South Station
  // var centerMarker = new google.maps.Marker({
  //   position: myLocation, 
  //   map: map
  // });

//   // Car icon for display in Google Maps
//   var icons = {
//     car: {
//       name: 'Car',
//       icon: 'car.png'
//     }
//   };

//   // List of the vehicles and their coordinates
//   var carLocations = [
//   { 
//     position: new google.maps.LatLng(42.3453, -71.0464),
//     type: 'car'
//   }, {
//     position: new google.maps.LatLng(42.3662, -71.0621),
//     type: 'car'
//   }, {
//     position: new google.maps.LatLng(42.3603, -71.0547),
//     type: 'car'
//   }, {
//     position: new google.maps.LatLng(42.3472, -71.0802),
//     type: 'car'
//   }, {
//     position: new google.maps.LatLng(42.3663, -71.0544),
//     type: 'car'
//   }, {
//     position: new google.maps.LatLng(42.3542, -71.0704),
//     type: 'car'
//   }
//   ];

//   // Marker for each vehicle in the list above
//   carLocations.forEach(function(carLocations) {
//     var marker = new google.maps.Marker( {
//       position: carLocations.position,
//       icon : icons[carLocations.type].icon,
//       map: map
//     });
//   });

}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(somePos) {
      myLat = somePos.coords.latitude;
      myLng = somePos.coords.longitude;
      makeMap();
    }); 
  }
  else {
      alert("Geolocation not supported by this browser!");
  }
}

function makeMap() {
  myLocation = new google.maps.LatLng(myLat, myLng);

  map.panTo(myLocation);

  // Marker for myLocation
  var centerMarker = new google.maps.Marker({
    position: myLocation, 
    map: map
  });

  google.maps.event.addListener(centerMarker, 'click', function() {
    infowindow.setContent(centerMarker.title);
    infowindow.open(map, centerMarker);
  });

}
