Drupal.st56mapa.layers.marcas = function(map, map_datos, capa, map_name) {
  //
  // Solamente se aplica a capas vacías, que simplemente se crean,
  // se comprueba si son seleccionables y se añaden estilos.
  // La url no se utiliza
  //
  var layer = new OpenLayers.Layer.Vector(capa.name, {
    visibility : capa.visible == 1 ? true : false,
    projection : new OpenLayers.Projection(capa.crs),
    reportError : false,
  });
  //
  if (capa.seleccionable == 1) {
    map_datos['olcapasseleccionables'].push(layer);
  }
  //
  var vector_style = {};
  var nombre_estilo = capa['estilo_name'];
  switch (capa['estilo_tipo']) {
  case '0': // Símbolo único para todos
    vector_style = new OpenLayers.StyleMap({
      'default' : map_datos['estilos'][nombre_estilo]
    });
    break;
  case '1': // Reglas de valor único
    vector_style = new OpenLayers.StyleMap();
    vector_style.addUniqueValueRules('default', capa['estilo_id'],
        map_datos['estilos'][nombre_estilo]);
    break;
  }
  layer.styleMap = vector_style;
  return layer;
};