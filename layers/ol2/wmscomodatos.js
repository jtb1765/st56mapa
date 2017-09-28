Drupal.st56mapa.layers.wmscomodatos = function(map, map_datos, capa, map_name) {
  //
  // Para utilizar las capas wms como capas de datos
  // Para obtener datos de estas capas deben tener el valor 
  // seleccionable a 2 para añadirlas al conjunto olcapasfeatureinfo
  //
  var layer = new OpenLayers.Layer.WMS(
      capa.name, 
      capa.url, 
      {
        layers : capa.capas, //'2', 
        transparent : true,
      }, 
      {
        opacity : capa.opacity,
        displayOutsideMaxExtent : false,
        visibility : capa.visible == 1 ? true : false,
        attribution: capa.attribution
      }
  );
  if (capa.seleccionable == 2) {
    map_datos['olcapasfeatureinfo'].push(layer);
  }
  //
  return layer;
};