(function($) {
  Drupal.behaviors.st56mapa_control_opacidadcapas = {
    'attach' : function(context, settings) {
      $('.jmapas-map')
          .once(
              'jmapas-control-opacidadcapas',
              function() {
                //
                // Añadir el control botón para activar/desactivar el click
                //
                //var map_id = $(this).attr('id');
                var map = $(this).data("st56mapa").map;
                var map_datos = settings.st56mapa.map_datos;
                var container = map_datos.containers['jtbopacidadcapas'];
                var opciones = map_datos.controles[container].jtbopacidadcapas.opciones;
                var options = {
                  //title : opciones.title,
                  type : OpenLayers.Control.TYPE_BUTTON,
                  displayClass : 'jtbOpacidadCapas',
                  trigger : Drupal.st56mapa.controlTransparenciaCapas,
                };

               /* map_datos[container]
                    .push(new OpenLayers.Control.Button(options));*/
                var control = new OpenLayers.Control.Button(options);
                map.addControl(control);
                //map_datos[container].push(new OpenLayers.Control.Button(options));
                map_datos[container].push(new GeoExt.Action({
                  control: control,
                  map: map,
                  tooltip: opciones.title,
                  tooltipType: 'title',
                  iconCls: "jtbOpacidadCapasItemInactive",
                }));
              }); //fin de once
    } //fin de attach
  }; //fin de Drupal.behaviors.st56mapa_control_navigation
})(jQuery);