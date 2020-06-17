var map;
var myLat = 0;
var myLng = 0;




function initMap() {

  //Location of initial map
  var myLocation = new google.maps.LatLng(myLat, myLng);

  // The map, centered on retrieved geolocation
  map = new google.maps.Map(document.getElementById('map'), {
        center: myLocation,
        zoom: 13
        });

  getLocation();

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
    map: map,
    title: "Closest vehicle: "
  });

 

  var infowindow = new google.maps.InfoWindow();

  google.maps.event.addListener(centerMarker, 'click', function() {
    infowindow.setContent(centerMarker.title);
    infowindow.open(map, centerMarker);
  });

 
  console.log("hi from makemap");

  hailRides();
}

function hailRides() {

  console.log("hi from hail");

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://jordan-marsh.herokuapp.com/rides", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  // CODE FOR ONREADY HERE
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // get data 
      var responseData = xhr.responseText;

      // parse data into list
      var parsedData = JSON.parse(responseData);

      // to set the boundary of the map according to the markers
      var bounds = new google.maps.LatLngBounds();

      // marks each available ride on the map
      // extending the bounds of the map as needed

      for (var i = 0; i < parsedData.length; i++){
        rideLat = parsedData[i]['lat'];
        rideLng = parsedData[i]['lng'];
        rideLocation = new google.maps.LatLng(rideLat, rideLng);

        var marker = new google.maps.Marker({
          position: rideLocation,
          icon: 'car.png',
          map: map
        });
        bounds.extend(rideLocation);
      }
      map.fitBounds(bounds);

      console.log(parsedData);
      console.log("hi from onreadystatechange, NOW READY");
    }
    else if (xhr.readyState == 4 && xhr.status != 200) {
      console.log("ERROR, something isn't right");
    }
    else {
      console.log("not complete, in progress");
    }
  };

  // CODE TO SEND HERE
  console.log(myLat);
  console.log("hi" + myLng);

  xhr.send("username=RgSVguNn&lat=" + myLat + "&lng=" + myLng);



    

}

