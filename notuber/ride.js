var map;function initMap(){var c=new google.maps.LatLng(42.352271,-71.055242);map=new google.maps.Map(document.getElementById("map"),{center:c,zoom:13});var a=new google.maps.Marker({position:c,map:map});var b={car:{name:"Car",icon:"car.png"}};var d=[{position:new google.maps.LatLng(42.3453,-71.0464),type:"car"},{position:new google.maps.LatLng(42.3662,-71.0621),type:"car"},{position:new google.maps.LatLng(42.3603,-71.0547),type:"car"},{position:new google.maps.LatLng(42.3472,-71.0802),type:"car"},{position:new google.maps.LatLng(42.3663,-71.0544),type:"car"},{position:new google.maps.LatLng(42.3542,-71.0704),type:"car"}];d.forEach(function(f){var e=new google.maps.Marker({position:f.position,icon:b[f.type].icon,map:map})})};