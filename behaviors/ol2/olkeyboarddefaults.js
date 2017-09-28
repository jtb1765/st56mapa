/**
 * Añadir control KeyboardDefaults al array de controles del panel
 * 
 */
(function($) {
  Drupal.behaviors.st56mapa_control_keyboarddefaults = {
    'attach' : function(context, settings) {
      $('.jmapas-map').once(
          'jmapas-control-keyboarddefaults',
          function() {
            //var map_id = $(this).attr('id');
            var map = $(this).data("st56mapa").map;
            var map_datos = settings.st56mapa.map_datos;
            var container = map_datos.containers['olkeyboarddefaults'];
            var control = map_datos.controles[container].olkeyboarddefaults;
            var options = {
              slideFactor : parseInt(control.opciones.slideFactor)
            };
            /*map_datos[container].push(new OpenLayers.Control.KeyboardDefaults(
                options));*/
            map.addControl(new OpenLayers.Control.KeyboardDefaults(options));
          }); // fin de once
    } // fin de attach
  }; // fin de Drupal.behaviors.st56mapa_xxx
})(jQuery);