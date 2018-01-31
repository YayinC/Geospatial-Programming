var phillybucks;
var fmnp;
var snap;
var LFilterOne;
var LFilterTwo;
var LFilterThree;
var LFilterFour;
var LocationFilter1=[];
var LocationFilter2=[];
var LocationFilter3=[];
var LocationFilter4=[];

var remove = function(data){
  _.each(data._layers, function(markers){
      map.removeLayer(markers);
  });
};

var reremove=function(data){
  _.each(data, function(layer){
      map.removeLayer(layer);
  });
};

$('#search1').click(function() {
  zip=$('#zip').val();
console.log(zip);
  var myFilter_zip = function(feature) {
    if(feature.properties.ZIP==zip){
      return true;
    }
      };

  var myStyle_zip = function(feature) {
          return {color: "#f15a32"};
  };

  var geojsonMarkerOptions = {
    radius: 6,
    weight: 1,
    opacity: 1,
    fillOpacity: 1
};
if(zip.length!==0){
  $('.legend').show();
  $('#searchinfo').empty();
  $('#searchinfo').append('Here are farmer markers in zip code area '+ zip +".");
      $(document).ready(function() {
         $.ajax(foodmarket).done(function(data) {
           var parsedData = JSON.parse(data);
    LFilterOne=L.geoJson(parsedData, {
                       style: myStyle_zip,
                       filter: myFilter_zip,
                       pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, geojsonMarkerOptions);
      }
  });
  console.log(LFilterOne);
  LFilterOne.addTo(map);
  LocationFilter1.push(LFilterOne);
    });
  });
}

});

$('#search2').click(function() {
  phillybucks=theFormName.elements["voucher"];
  console.log(phillybucks);
  var myFilter_phillybucks = function(feature) {
    if(phillybucks[0].checked) {
      if(feature.properties.ACCEPT_PHILLY_FOOD_BUCKS=="X"){
      return true;
      }
    }
    else if(phillybucks[1].checked) {
      if(feature.properties.ACCEPT_PHILLY_FOOD_BUCKS!=="X"){
      return true;
    }}
      };

    var myStyle_phillybucks = function(feature) {
          if(phillybucks[0].checked) {
          return {color: "#030071"};
          }
          else if(phillybucks[1].checked) {
          return {color: "#8ccbff"};
        }

      };
      $('.legend').show();
      $('#searchinfo').empty();
      var detail = function(feature) {
            if(phillybucks[0].checked) {
            $('#searchinfo').append('Here are farmer markers which accept philly food bucks.');
            }
            else if(phillybucks[1].checked) {
            $('#searchinfo').append('Here are farmer markers which refuse to accept philly food bucks.');
          }
        };

      detail();
  var geojsonMarkerOptions = {
    radius: 6,
    weight: 1,
    opacity: 1,
    fillOpacity: 1
};
    $(document).ready(function() {
       $.ajax(foodmarket).done(function(data) {
         var parsedData = JSON.parse(data);
  LFilterTwo=L.geoJson(parsedData, {
                     style: myStyle_phillybucks,
                     filter: myFilter_phillybucks,
                     pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }
});
LFilterTwo.addTo(map);
LocationFilter2.push(LFilterTwo);
  });
});
});

$('#search3').click(function() {
  fmnp=theFormName2.elements["voucher"];
  console.log(fmnp);
  var myFilter_fmnp = function(feature) {
    if(fmnp[0].checked) {
      if(feature.properties.ACCEPT_FMNP=="X"){
      return true;
      }
    }
    else if(fmnp[1].checked) {
      if(feature.properties.ACCEPT_FMNP!=="X"){
      return true;
    }}
      };

    var myStyle_fmnp = function(feature) {
          if(fmnp[0].checked) {
           return {color: "#65022a"};

          }
          else if(fmnp[1].checked) {
           return {color: "#ff64a2"};
          }

      };
      $('.legend').show();
      $('#searchinfo').empty();
      var detail = function(feature) {
            if(fmnp[0].checked) {
            $('#searchinfo').append('Here are farmer markers which accept FMNP.');
            }
            else if(fmnp[1].checked) {
            $('#searchinfo').append('Here are farmer markers which refuse to accept FMNP.');
          }
        };

      detail();
  var geojsonMarkerOptions = {
    radius: 6,
    weight: 1,
    opacity: 1,
    fillOpacity: 1
};
    $(document).ready(function() {
       $.ajax(foodmarket).done(function(data) {
         var parsedData = JSON.parse(data);
  LFilterThree=L.geoJson(parsedData, {
                     style: myStyle_fmnp,
                     filter: myFilter_fmnp,
                     pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }
});
LFilterThree.addTo(map);
LocationFilter3.push(LFilterThree);
  });
});
});

$('#search4').click(function() {
  snap=theFormName3.elements["voucher"];
  console.log(snap);
  var myFilter_snap = function(feature) {
    if(snap[0].checked) {
      if(feature.properties.ACCEPT_SNAP_ACCESS=="X"){
      return true;
      }
    }
    else if(snap[1].checked) {
      if(feature.properties.ACCEPT_SNAP_ACCESS!=="X"){
      return true;
    }}
      };

    var myStyle_snap = function(feature) {
          if(snap[0].checked) {
           return {color: "#004929"};

          }
          else if(snap[1].checked) {
           return {color: "#9fffd5"};
          }
      };
      $('.legend').show();
      $('#searchinfo').empty();
      var detail = function(feature) {
            if(snap[0].checked) {
            $('#searchinfo').append('Here are farmer markers which accept snap.');
            }
            else if(snap[1].checked) {
            $('#searchinfo').append('Here are farmer markers which refuse to accept snap.');
          }
        };
      detail();
  var geojsonMarkerOptions = {
    radius: 6,
    weight: 1,
    opacity: 1,
    fillOpacity: 1
};
    $(document).ready(function() {
       $.ajax(foodmarket).done(function(data) {
         var parsedData = JSON.parse(data);
  LFilterFour=L.geoJson(parsedData, {
                     style: myStyle_snap,
                     filter: myFilter_snap,
                     pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }
});
LFilterFour.addTo(map);
LocationFilter4.push(LFilterFour);
  });
});
});

$('#clear1').click(function() {
  reremove(LocationFilter1);
  remove(LFilterOne);
  $('#searchinfo').empty();
  console.log(LocationFilter1);
});


$('#clear2').click(function() {
  reremove(LocationFilter2);
  remove(LFilterTwo);
  $('#searchinfo').empty();
  console.log(LocationFilter2);
});

$('#clear3').click(function() {
  reremove(LocationFilter3);
  remove(LFilterThree);
  $('#searchinfo').empty();
  console.log(LocationFilter3);
});

$('#clear4').click(function() {
  reremove(LocationFilter4);
  remove(LFilterFour);
  $('#searchinfo').empty();
  console.log(LocationFilter4);
});
