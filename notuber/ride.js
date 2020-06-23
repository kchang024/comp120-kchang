var map;
var myLat = 0;
var myLng = 0;


// initialization function
// This function is called via the script src in the html
function initMap() {
  var myLocation = new google.maps.LatLng(myLat, myLng);

  // The map, centered on retrieved geolocation
  map = new google.maps.Map(document.getElementById('map'), {
        center: myLocation,
        zoom: 13
        });

  getLocation();
}

// gets the location of the user based on google's geolocation
// if location is found app countinues to look for car rides
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(somePos) {
      myLat = somePos.coords.latitude;
      myLng = somePos.coords.longitude;
      makeMap();
      hailRides();
    }); 
  }
  else {
      alert("Geolocation not supported by this browser!");
  }
}

// makes the map depending on the user's geolocation
function makeMap() {
  myLocation = new google.maps.LatLng(myLat, myLng);
  map.panTo(myLocation);
}

// Uses the ride hailing API to get a list of cars "nearby" the user
function hailRides() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://vast-lowlands-89960.herokuapp.com/rides", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // get data 
      var responseData = xhr.responseText;
      // parse data into list
      var parsedData = JSON.parse(responseData);
      // to set the boundary of the map according to the markers
      var bounds = new google.maps.LatLngBounds();
      // initial declare for variable to hold closest distance
      var distClosest = 1000000.11;

      var carInfo = new google.maps.InfoWindow();

      // loops through the returned string from the ride-hailing API
      // sets markers for each available ride on the map
      // extending the bounds of the map as needed
      for (var i = 0; i < parsedData.length; i++){
        rideLat = parsedData[i]['lat'];
        rideLng = parsedData[i]['lng'];
        rideLocation = new google.maps.LatLng(rideLat, rideLng);

        // makes a marker for each service car
        var marker = new google.maps.Marker({
          position: rideLocation,
          icon: 'car.png',
          map: map,
          title: "notUber car"
        });

        // calculates distance between your location and service car
        distBetw = google.maps.geometry.spherical.computeDistanceBetween(myLocation, rideLocation);
        distBetwMiles = toMiles(distBetw);

        // makes a info window for each service car and displays ETA to user
        makeInfoWindow(marker, map, carInfo, "This car is " + distBetwMiles + " miles away from you");

        // gets and sets info on the closest service car in meters 
        if (distBetwMiles < distClosest) {
          distClosest     = distBetwMiles;
          var closestUser = parsedData[i]['username'];
          var closestLat  = rideLat;
          var closestLng  = rideLng;
        }

        bounds.extend(rideLocation);
      }

      map.fitBounds(bounds);

      // Marker for myLocation
      var yourMarker = new google.maps.Marker({
        position: myLocation, 
        map: map,
        title: "Hi Ming! Based on Google's Geolocation, this is where YOU are!"
      });

      // Infowindow for your marker showing ride hail service information
      var infowindow = new google.maps.InfoWindow();

      var ContentString = '<h1>Where is my notUber?</h1>' +
                          '<div id="bodyContent">' +
                          '<p>Closest car is: '  + closestUser + '</p>' + 
                          '<p>Currently at: ' + closestLat + ", " + closestLng  + '</p>' +
                          '<p>' + closestUser + ' is ' + distClosest + ' miles away' +'</p>'
                          '</div>';

      makeInfoWindow(yourMarker, map, infowindow, ContentString);

      drawPolyline(myLat, myLng, closestLat, closestLng);
    }
    else if (xhr.readyState == 4 && xhr.status != 200) {
      document.getElementById("map").innerHTML = xhr.status + "<p> ERROR </p>";
    }
  };

  xhr.send("username=RgSVguNn&lat=" + myLat + "&lng=" + myLng);
}

// draws a red polyline showing a path between two locations
function drawPolyline (myLat, myLng, closestLat, closestLng) {
      var polyLine = new google.maps.Polyline({
        path: [
          {lat: myLat, lng: myLng},
          {lat: closestLat, lng: closestLng}
        ],
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      polyLine.setMap(map);
}

// converts meters to miles
function toMiles (meters) {
  return meters * 0.000621371;
}

// creates an google InfoWindow and sets its contents
function makeInfoWindow (marker, map, carInfo, content) {
  marker.addListener('click', function() {
    carInfo.setContent(content);
    carInfo.open(map, this);
  }, {passive: true});
}