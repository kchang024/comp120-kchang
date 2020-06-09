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
  var marker = new google.maps.Marker({
    position: southStation, 
    map: map
  });
}
   

