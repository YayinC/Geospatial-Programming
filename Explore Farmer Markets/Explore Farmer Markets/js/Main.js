
var Boundary ="https://gist.githubusercontent.com/anonymous/eb5a6386acba87e14f8f4262cb4d0488/raw/7d073e2bab2e0a2cb55e1b19e0b9439bc833c886/boundary.json";
var foodmarket="https://gist.githubusercontent.com/anonymous/e709b425a63500e46b94c29357acf937/raw/fd14dfef638f4806075807d90147850be4ffa319/market.json";
var ZoomAddress=null;
var layerone;
var getlat;
var getlng;
var zip=null;

var setview = function(){
  map.setView([40.000, -75.1090],11);
};

$('#second').hide();
$('#third').hide();
$('#fourth').hide();
$('#information').hide();
$('.legend').hide();

var removeAll=function(){
    reremove(LocationFilter1);
    remove(LFilterOne);
    reremove(LocationFilter2);
    remove(LFilterTwo);
    reremove(LocationFilter3);
    remove(LFilterThree);
    reremove(LocationFilter4);
    remove(LFilterFour);
};

$( "#main" ).click(function() {
  setview();
  $('#searchinfo').empty();
  $('#first').show();
  $('#second').hide();
  $('#third').hide();
  $('#fourth').hide();
  $('.legend').hide();
  $('#information').hide();
});

$( "#search" ).click(function() {
  console.log("I am yayin");
  setview();
  $('#searchinfo').empty();
  $('#first').hide();
  $('#second').show();
  $('#third').hide();
  $('#fourth').hide();
  $('.legend').hide();
  $('#information').hide();
});

$( "#zoom" ).click(function() {
  console.log("I am yayin");
  setview();
  $('#searchinfo').empty();
  $('#first').hide();
  $('#second').hide();
  $('#third').show();
  $('#fourth').hide();
  $('.legend').hide();
  $('#information').hide();
});

$( "#route" ).click(function() {
  console.log("I am yayin");
  setview();
  $('#searchinfo').empty();
  $('#first').hide();
  $('#second').hide();
  $('#third').hide();
  $('#fourth').show();
  $('.legend').hide();
  $('#information').hide();
});

//define style
var myStyle = function(feature) {
        return {color: "#007089"};
};

//to get the layer of farmer markets
var SlideOne= function(){
  console.log("I am yayin");
      var geojsonMarkerOptions = {
       radius: 6,
       weight: 1,
       opacity: 1,
       fillOpacity: 0.8
   };
     $(document).ready(function() {
        $.ajax(foodmarket).done(function(data) {
          var parsedData = JSON.parse(data);
   layerone=L.geoJson(parsedData, {
                      onEachFeature:Showinformation,
                      style: myStyle,
                      pointToLayer: function(feature,latlng) {
         return L.circleMarker(latlng, geojsonMarkerOptions);
     }
   }).addTo(map);
   });
   });
};

SlideOne();

var showResults = function() {
    $('#information').show();
};

var Showinformation = function(feature,layer) {
  layer.on('click', function (event) {
  {
    console.log("I am the destination!");
    $('#name').text(feature.properties.NAME);
    $('#neighborhood').text(feature.properties.NEIGHBORHOOD);
    $('#addressinfo').text(feature.properties.ADDRESS);
    getlat=(feature.geometry.coordinates[1]);
    getlng=(feature.geometry.coordinates[0]);
    console.log(getlat,getlng);
    showResults();
  }
  });
};
