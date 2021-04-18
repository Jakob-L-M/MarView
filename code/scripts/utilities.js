function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }
  
  function coord_dist(coord1, coord2) {
       
    var lat1 = coord1[0];
    var lon1 = coord1[1];
    var lat2 = coord2['lat'];
    var lon2 = coord2['lng'];

    var earthRadiusKm = 6371;
  
    var dLat = degreesToRadians(lat2-lat1);
    var dLon = degreesToRadians(lon2-lon1);
  
    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);
  
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return earthRadiusKm * c;
  }