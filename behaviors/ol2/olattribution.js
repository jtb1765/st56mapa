/**
 * Añadir control Attribution al array de controles del panel
 * 
 */
(function($) {
  Drupal.behaviors.st56mapa_control_attribution = {
    'attach' : function(context, settings) {
      $('.jmapas-map').once('jmapas-control-attribution', function() {
        //var map_id = $(this).attr('id');
        var map = $(this).data("st56mapa").map;
        var map_datos = settings.st56mapa.map_datos;
        var container = map_datos.containers['olattribution'];
        var control = map_datos.controles[container].olattribution;
        var options = {
          separator : control.opciones.separator,
          //template: "${layers}",
          //div : document.getElementById(control.divid),
        };
        //map_datos[container].push(new OpenLayers.Control.Attribution(options));
        var control = new OpenLayers.Control.Attribution(options);
        map.addControl(control);
      }); // fin de once
    } // fin de attach
  }; // fin de Drupal.behaviors.st56mapa_xxx
})(jQuery);