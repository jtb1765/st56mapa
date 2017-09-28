Drupal.st56mapa.layers.wmts = function(map, map_datos, capa, map_name) {
  //Probando
  //var projection = new OpenLayers.Projection(map.projection);
  /*var map_settings = document.getElementById("map_element").data("st56mapa").settings;
  var size = (map_settings['xmax'] - map_settings['xmin']) / 256;
  var resolutions = new Array(18);
  var matrixIds = new Array(18);
  for (var z = 0; z < 18; ++z) {
    // generate resolutions and matrixIds arrays for this WMTS
    resolutions[z] = size / Math.pow(2, z);
    matrixIds[z] = "EPSG:25830:" + z;
  }*/
  return new OpenLayers.Layer.WMTS({
    name : capa.name, 
    url : capa.url,
    layer : capa.capas,
    style : "default",
    matrixSet : "default028mm", //"EPSG:25830", 
   // matrixIds : matrixIds,
    //resolutions: reolutions,
    format : capa.format,
    isBaseLayer : true,
    displayOutsideMaxExtent : true,
    requestEncoding : "RESTful",
    attribution : capa.attribution,
    crs : "EPSG:25830",
    zoomOffset: 0,   
  });
};