/**
 * Añadir control MousePosition al array de controles del panel
 * 
 */
(function($) {
	Drupal.behaviors.st56mapa_control_mouseposition = {
		'attach': function(context, settings) {
			$('.jmapas-map').once('jmapas-control-mouseposition', function() {
			  //var map_id = $(this).attr('id');
			  var map = $(this).data("st56mapa").map;
              var map_datos = settings.st56mapa.map_datos;
			  var container = map_datos.containers['olmouseposition'];
			  var control = map_datos.controles[container].olmouseposition;
			  var opciones = control.opciones;
			  var options = {
			      //div: document.getElementById(control.divid),
				  numDigits: parseInt(opciones.numDigits),
				  prefix: opciones.prefix,
				  separator: opciones.separator,
				  suffix: opciones.suffix,
				  emptyString: opciones.emptyString,
				  displayProjection: new OpenLayers.Projection(settings.st56mapa.map_settings['display_projection']),
			  };
			  /*map_datos[container].push(
			      new OpenLayers.Control.MousePosition(options)
			  );*/
			  var control = new OpenLayers.Control.MousePosition(options);
			  map.addControl(control);
			}); //fin de once
		} //fin de attach
	}; //fin de Drupal.behaviors.st56mapa_xxx
})(jQuery);