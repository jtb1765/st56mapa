/**
 * Añadir control LayerTree de geoExt al array de controles del panel
 * 
 */
//var carpeta, tree;
(function($) {
  Drupal.behaviors.st56mapa_control_gxlayertree = {
    'attach' : function(context, settings) {
      $('.jmapas-map').once('jmapas-control-gxlayertree', function() {
        //var map_id = $(this).attr('id');
        var map_datos = settings.st56mapa.map_datos;
        var map_settings = settings.st56mapa.map_settings;
        var container = map_datos.containers['jtbgxlayertree'];
        var control = map_datos.controles[container].jtbgxlayertree;
        var options = {
            // roundedCorner: control.opciones.roundedCorner == "true" ?
            // true : false,
            //div : document.getElementById(control.divid),
        };
        var mapPanel = $("#map_element").data("st56mapa").map_panel;
        //
        var grupoBase = new GeoExt.tree.BaseLayerContainer({
          text: map_settings.etiquetas.baselbl,
          layerStore: mapPanel.layers,
          leaf: false,
          expanded: true,
          collapsible: true,
        });
        //
        var root = [];
        root.push(grupoBase);
        //
        var grupoDatos = new GeoExt.tree.OverlayLayerContainer({
          text: map_settings.etiquetas.datalbl,
          layerStore: mapPanel.layers,
          leaf: false,
          expanded: true,
          collapsible: true,
        });
        root.push(grupoDatos);
        //
        //Ver que grupos de de capas de datos hay
       /* var capasDatos = map_datos['capadatos'], arGrupos = [];
        jQuery.each(capasDatos, function(key, capa) {
          var grupo = capa['grupo'];
          if (!arGrupos.includes(grupo)){
            arGrupos.push(grupo);
          }
        });
        //Crear los layercontainers para cada grupo
        jQuery.each(arGrupos, function(key, grupo){
           var carpeta = new GeoExt.tree.LayerContainer({
            text: grupo,
            layerStore: mapPanel.layers,
            leaf: false,
            expanded: true,
            root: {
              nodeType: "gx_layer",
              checked: true,
            },
            //format: "image/gif",
            loader: {
              filter: function(record){
                var layer = record.get("layer");
                //console.log(layer);
                if (layer.clase.indexOf("wmscomodatos") == 0 ||
                    layer.clase.indexOf("vector") == 0 ||
                    layer.clase.indexOf("marcas") == 0 ) {
                  return layer.group.indexOf(grupo) != -1
                }
              }
            }
          });
          root.push(carpeta);
        })*/
        //
        map_datos[container].push(root); //tree); 
      }); //fin de once
    } //fin de attach
  }; //fin de Drupal.behaviors
})(jQuery);