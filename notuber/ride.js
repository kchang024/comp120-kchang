var map;
var myLat = 0;
var myLng = 0;

// This function is called via the script src in the html
function initMap() {
  //Location of initial map
  var myLocation = new google.maps.LatLng(myLat, myLng);

  // The map, centered on retrieved geolocation
  map = new google.maps.Map(document.getElementById('map'), {
        center: myLocation,
        zoom: 13
        });

  getLocation();
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

      // initial declare for variable to hold closest distance
      var distClosest = 1000000.11;

      // marks each available ride on the map
      // extending the bounds of the map as needed
      for (var i = 0; i < parsedData.length; i++){
        rideLat = parsedData[i]['lat'];
        rideLng = parsedData[i]['lng'];
        rideLocation = new google.maps.LatLng(rideLat, rideLng);

        console.log(rideLocation);

        var marker = new google.maps.Marker({
          position: rideLocation,
          icon: 'car.png',
          map: map
        });

        // calculates distance between your location and service car
        distBetw = google.maps.geometry.spherical.computeDistanceBetween(myLocation, rideLocation);
        console.log("diff in meters: " + distBetw);
        console.log("closest: " + distClosest);

        if (distBetw < distClosest) {
          distClosest = distBetw;
          console.log("in if");
          var closestUser = parsedData[i]['username'];
          var closestLat = rideLat;
          var closestLng = rideLng;
        }

        bounds.extend(rideLocation);
      }

      map.fitBounds(bounds);

      // converts the distance from meters to miles
      distClosest = distClosest * 0.000621371;

      // Marker for myLocation
      var centerMarker = new google.maps.Marker({
        position: myLocation, 
        map: map,
        title: "Hi Ming! Based on Google's Geolocation, this is where YOU are!"
      });

      // Infowindow for your marker showing ride hail service information
      var infowindow = new google.maps.InfoWindow();

      var ContentString = '<h1>Where is my notUber?</h1>' +
                          '<div id="bodyContent">' +
                          '<p>Closest vehicle is: '  + closestUser + '</p>' + 
                          '<p>Currently at: ' + closestLat + ", " + closestLng  + '</p>' +
                          '<p>' + closestUser + ' is ' + distClosest + ' miles away' +'</p>'
                          '</div>';

      google.maps.event.addListener(centerMarker, 'click', function() {
        infowindow.setContent(ContentString);
        infowindow.open(map, centerMarker);
      });

      //adding polyline paths
      var linePath = [
        {lat: myLat, lng: myLng},
        {lat: closestLat, lng: closestLng}
      ];

      var polyLine = new google.maps.Polyline({
        path: linePath,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
      polyLine.setMap(map);

      console.log("final closest: " + distClosest);
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
  xhr.send("username=RgSVguNn&lat=" + myLat + "&lng=" + myLng);
}


