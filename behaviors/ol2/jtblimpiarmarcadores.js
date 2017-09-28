/**
 * Añadir control Imprimir al array de controles del panel le pongo prefijo
 * jtb para distinguirlo de los de OpenLayers (ol)
 * 
 */
(function($) {
  Drupal.behaviors.st56mapa_control_limpiarmarcadores = {
    'attach' : function(context, settings) {
      $('.jmapas-map')
          .once(
              'jmapas-control-limpiarmarcadores',
              function() {
                // var map_id = $(this).attr('id');
                var map = $(this).data("st56mapa").map;
                var map_datos = settings.st56mapa.map_datos;
                var container = map_datos.containers['jtblimpiarmarcadores'];
                var opciones = map_datos.controles[container].jtblimpiarmarcadores.opciones;
                var options = {
                  title : opciones.title,
                  type : OpenLayers.Control.TYPE_BUTTON,
                  displayClass : 'jtbLimpiarMarcadores',
                  trigger : Drupal.st56mapa.limpiarMarcadores
                };
                var control = new OpenLayers.Control.Button(options);
                map.addControl(control);
                //map_datos[container].push(new OpenLayers.Control.Button(options));
                map_datos[container].push(new GeoExt.Action({
                  control: control,
                  map: map,
                  tooltip: opciones.title,
                  tooltipType: 'title',
                  iconCls: "jtbLimpiarMarcadoresItemInactive",
                }));
              }); // fin de once
    } // fin de attach
  }; // fin de Drupal.behaviors.st56mapa_control_navigation
})(jQuery);