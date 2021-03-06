(function($) {
	/**
	 * Añadir control para ficha urbanística al array de controles del panel
	 * le pongo prefijo jtb para distinguirlo de los de OpenLayers (ol)
	 * Al activar el control asignamos una función para gestionar el click
	 * Al desactivar el control desasignamos la función
	 * 
	 */
	Drupal.behaviors.st56mapa_control_notas = {
		'attach': function(context, settings) {
			$('.jmapas-map').once('jmapas-control-notas', function() {
				//
				//Handler del click según ejemplos de openlayers para dirigir
				//el click hacua Drupal.st56mapa.ficha
				//
				OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {
					defaultHandlerOptions: {
						'single': true,
						'double': false,
						'pixelTolerance': 0,
						'stopSingle': false,
						'stopDouble': false
					},
					initialize: function(options2) {
						this.handlerOptions = new OpenLayers.Util.extend(
								{}, this.defaultHandlerOptions
								);
						OpenLayers.Control.prototype.initialize.apply(
								this, arguments
								);
						this.handler = new OpenLayers.Handler.Click(
								this, {
									'click':Drupal.st56mapa.crearNota
									}, this.handlerOptions
									);
					}
				});
				//
				//Añadir el control click al mapa
				//
				var map = $("#map_element").data("st56mapa").map;
				var click = new OpenLayers.Control.Click();
				map.addControl(click);
				//
				//Añadir el control botón para activar/desactivar el click
				//
				var container = settings.st56mapa.map_datos.containers['jtbgxnotas'];
				var opciones = settings.st56mapa.map_datos.controles[container].jtbgxnotas.opciones;			
				settings.st56mapa.map_datos[container].push(new GeoExt.Action({
	              control: click,
	              map: map,
	              toggleGroup: "jtbgxtoolbar",
	              allowDepress: false,
	              //pressed: true,
	              tooltip: opciones.title,
	              tooltipType: 'title',
	              activateOnEnable: true,
	              deactivateOnDisable: true,
	              iconCls: "jtbNotasItemActive",
	              //check items options
	              group: "jtbgxtoolbar",
	              //checked: true
	            }));
			}); //fin de once
		} //fin de attach
	}; //fin de Drupal.behaviors.st56mapa_control_navigation
})(jQuery);