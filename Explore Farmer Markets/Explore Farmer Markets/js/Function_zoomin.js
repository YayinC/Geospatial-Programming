var state = {
  position: {
    marker: null,
    updated: null
  }
};
var Address_search;
var Address_input;
var origin_coordinates;
var searchresult;
var ResultOnmap=null;

//set up origin
var goToOrigin = _.once(function(lat, lng) {
  origin_coordinates = [lat,lng];
  console.log(origin_coordinates[0],origin_coordinates[1]);
});

var updatePosition = function(lat, lng, updated) {
  if (state.position.marker) { map.removeLayer(state.position.marker); }
  state.position.marker = L.circleMarker([lat, lng], {color: "#207f76"});
  console.log(lat, lng);
  state.position.updated = updated;
  state.position.marker.addTo(map);
  goToOrigin(lat, lng);
};

//clikc to zoom in to the area near the input address
$(document).ready(function(){
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      updatePosition(position.coords.latitude, position.coords.longitude, position.timestamp);
      console.log("I hate coding");
    });
  } else {
    alert("Unable to access geolocation API!");
  }

  $('#address').keyup(function(e) {
    if ($('#address').val().length === 0) {
      $('#clickzoom').attr('disabled', true);
    } else {
      $('#clickzoom').attr('disabled', false);
    }
  });

  $("#clickzoom").click(function(e) {
    if(ResultOnmap!==null){
      map.removeLayer(ResultOnmap);
    }
    Address_input = $('#address').val();
     console.log(Address_input);
    searchresult = "http://search.mapzen.com/v1/search?api_key=mapzen-LYQZKGw&text="+ Address_input +
    "&boundary.circle.lon=" + origin_coordinates[1] +"&boundary.circle.lat="+ origin_coordinates[0] +"&boundary.circle.radius=10&size=1";
    $.ajax(searchresult).done(function(data) {
      console.log(data.features.length);
      if (data.features.length !== 0){
        Address_search = data.features[0].geometry.coordinates;
        console.log(Address_search);
        ResultOnmap=L.circleMarker([Address_search[1],Address_search[0]], {color: "#ff572a"}).addTo(map);
        console.log(Address_search[1],Address_search[0]);
        map.setView([Address_search[1],Address_search[0]],15);
      }else{
        alert("Please input valid address!");
      }
    });
});
});

$("#clearzoom").click(function(e){
  if(ResultOnmap!==null){
    map.removeLayer(ResultOnmap);
    setview();
  }
});

//zoom page: set up coordinates to zoom
var CenterCityView=function(){
  map.setView([39.953222, -75.163755],14);
};

var NorthPhillyView=function(){
  map.setView([39.992443, -75.153979],13);
};

var WestPhillyView=function(){
  map.setView([39.965136, -75.224531],14);
};

var UniversityCityView=function(){
  map.setView([39.952376, -75.193217],15);
};

//zoom page: explore given neighborhood
$('#CenterCity').click(function() {
  CenterCityView();
});
$('#NorthPhilly').click(function() {
  NorthPhillyView();
});
$('#WestPhilly').click(function() {
  WestPhillyView();
});
$('#UniversityCity').click(function() {
  UniversityCityView();
});

$('#fullview').click(function() {
  setview();
});
