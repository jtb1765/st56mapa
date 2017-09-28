/**
 * Añadir control Scale al array de controles del panel
 * 
 */
(function($) {
  Drupal.behaviors.st56mapa_control_scale = {
    'attach' : function(context, settings) {
      $('.jmapas-map').once('jmapas-control-scale', function() {
        //var map_id = $(this).attr('id');
        var map_datos = settings.st56mapa.map_datos;
        var container = map_datos.containers['olscale'];
        var control = map_datos.controles[container].olscale;
        var options = {
          div : document.getElementById(control.divid),
        };
        map_datos[container].push(new OpenLayers.Control.Scale(options));
      }); // fin de once
    } // fin de attach
  }; // fin de Drupal.behaviors.st56mapa_xxx
})(jQuery);