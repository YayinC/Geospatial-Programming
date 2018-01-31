var destOnmap=null;
var routeOnmap=null;
var departOnmap=null;
var route;
var optimizedroute;
var decoderoute;
var departure;
var Place_departure;


$("#findroute").click(function(e) {
  console.log("I have found a route!");
  if(destOnmap!==null){
    map.removeLayer(destOnmap);
  }
  if(routeOnmap!==null){
    map.removeLayer(routeOnmap);
  }
      destOnmap = L.circleMarker([getlat,getlng], {color: "#ff572a"}).addTo(map);
      locations={"locations":[{"lat":origin_coordinates[0], "lon":origin_coordinates[1]},{"lat":getlat,"lon":getlng}],
      "costing":"auto","directions_options":{"units":"miles"}};
      route="https://matrix.mapzen.com/optimized_route?json="+JSON.stringify(locations)+"&api_key=mapzen-LYQZKGw";
      console.log(route);
      $.ajax(route).done(function(data) {
        optimizedroute = data.trip.legs[0].shape;
        console.log(optimizedroute);
        decoderoute = decode(optimizedroute);
        console.log(decoderoute);
        routeOnmap = L.polyline(decoderoute,{color: "#e8cc37"}).addTo(map);
      });
    });

 $("#clearroute").click(function(e){
   if(destOnmap!==null){
     map.removeLayer(destOnmap);
   }
   if(routeOnmap!==null){
     map.removeLayer(routeOnmap);
   }
    $('#information').hide();
 });

  $('#depart').keyup(function(e) {
   if ($('#depart').val().length === 0) {
     $('##findroute2').attr('disabled', true);
   } else {
     $('##findroute2').attr('disabled', false);
   }
 });

 $("#findroute2").click(function(e) {
   if(destOnmap!==null){
     map.removeLayer(destOnmap);
   }
   if(departOnmap!==null){
     map.removeLayer(departOnmap);
   }
   if(routeOnmap!==null){
     map.removeLayer(routeOnmap);
   }
   if(routeOnmap!==null){
     map.removeLayer(routeOnmap);
   }
   departure = $('#depart').val();
    console.log(departure);
   Place_departure = "http://search.mapzen.com/v1/search?api_key=mapzen-LYQZKGw&text="+ departure +
   "&boundary.circle.lon=" + origin_coordinates[1] +"&boundary.circle.lat="+ origin_coordinates[0] +"&boundary.circle.radius=10&size=1";
   $.ajax(Place_departure).done(function(data) {
     console.log(data.features.length);
     if (data.features.length !== 0){
       inputdepart = data.features[0].geometry.coordinates;
       console.log(inputdepart);
       departOnmap = L.circleMarker([inputdepart[1], inputdepart[0]], {color: "#7e6e87"}).addTo(map);
       destOnmap = L.circleMarker([getlat,getlng], {color: "#ff572a"}).addTo(map);
       locations={"locations":[{"lat":inputdepart[1], "lon":inputdepart[0]},{"lat":getlat,"lon":getlng}],
       "costing":"auto","directions_options":{"units":"miles"}};
       route="https://matrix.mapzen.com/optimized_route?json="+JSON.stringify(locations)+"&api_key=mapzen-LYQZKGw";
       console.log(route);
       $.ajax(route).done(function(data) {
         optimizedroute = data.trip.legs[0].shape;
         console.log(optimizedroute);
         decoderoute = decode(optimizedroute);
         console.log(decoderoute);
         routeOnmap = L.polyline(decoderoute,{color: "#e8cc37"}).addTo(map);
       });
       console.log(inputdepart[1],inputdepart[0]);
     }else{
       alert("Please input valid address!");
     }
   });
 });

 $("#clearroute2").click(function(e){
   if(destOnmap!==null){
     map.removeLayer(destOnmap);
   }
   if(departOnmap!==null){
     map.removeLayer(departOnmap);
   }
   if(routeOnmap!==null){
     map.removeLayer(routeOnmap);
   }
     $('#information').hide();
 });
