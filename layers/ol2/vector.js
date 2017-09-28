Drupal.st56mapa.layers.vector = function(map, map_datos, capa, map_name) {
  //
  // Simplemente crea la capa vectorial sin añadir features
  // que se hará al añadir la capa a traves de  la llamada 
  // ajax definida también en este fichero.
  // Se definen los estilos
  // Llamada ajax para cargar las features
  //
  var options_geojson = {
    'ignoreExtraDims' : true,
    'internalProjection' : map.projection,
    'externalProjection' : new OpenLayers.Projection(capa.crs)
  };
  //
  var options_layer = {
    visibility : capa.visible == 1 ? true : false,
    projection : new OpenLayers.Projection(capa.crs),
    reportError : false,
    attribution : (capa.attribution) ? capa.attribution : "",
    
  };
  //
  var layer = new OpenLayers.Layer.Vector(capa.name, options_layer);
  
  //
  // Si capa.datos == fichero => capa.url vale planeamiento/39063ai2r2clases.geojson
  // Si capa.datos == vista => capa.url vale inventario/Catálogo urbanístico de Rionansa
  // Si capa.datos == local => el geojson está en localStorage
  // La respuesta del servidor es en geojson
  //
  if (capa.idname == 'notas') { //capa.datos == 'local') {
    var file = JSON.parse(localStorage.getItem(map_name));
//    console.log("vector: file");
//    console.log(file);
    if (file) {
      var features = new OpenLayers.Format.GeoJSON().read(file);
      layer.addFeatures(features);
    }
  } 
  else {
    jQuery.ajax({
      url : capa.url + "/" + capa.crs,
      type : 'POST',
      data : {
        DATOS : capa.datos, // fichero, vista o bd (este ya no se usa)
        SRS : capa.crs,
      },
      success : function(respuesta) {
        var features = new OpenLayers.Format.GeoJSON(options_geojson).read(respuesta);
        layer.addFeatures(features);
      },
      dataType : 'json'
    });
  }
  //
  // Las capas seleccionables las alamcenamos para luego
  // registrar los eventos featureselected y featureunselected
  // con la correspondiente función en el behavior olselectfeature.js
  //
  if (capa.seleccionable == 1) {
    map_datos['olcapasseleccionables'].push(layer);
  }
  //
  // Estilos
  //
  var vector_style = {};
  var nombre_estilo = capa['estilo_name'];
  switch (capa['estilo_tipo']) {
  case '0': // Símbolo único para todos
    vector_style = new OpenLayers.StyleMap({
      'default' : map_datos['estilos'][nombre_estilo]
    });
  //añadir títulos para leyenda
    vector_style.styles['default'].title = vector_style.styles['default'].defaultStyle.title
    break;
  case '1': // Reglas de valor único
    vector_style = new OpenLayers.StyleMap();
    vector_style.addUniqueValueRules('default', capa['estilo_id'],
        map_datos['estilos'][nombre_estilo]);
  //añadir títulos para leyenda
    jQuery.each(vector_style.styles['default'].rules, function(i, attrs){
      vector_style.styles['default'].rules[i].title = attrs.symbolizer.title;
    });
    break;
  }
  //
  layer.styleMap = vector_style;
  return layer;
};