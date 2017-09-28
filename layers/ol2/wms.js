Drupal.st56mapa.layers.wms = function(map, map_datos, capa, map_name) {
  return new OpenLayers.Layer.WMS(
      capa.name,
      capa.url, 
      {
        layers : capa.capas,
        transparent : true,
        format : capa.format,
     }, 
     {
        isBaseLayer : true,
        displayOutsideMaxExtent : false,
        attribution : capa.attribution,
     }
  );
};