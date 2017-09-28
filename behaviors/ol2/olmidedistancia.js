/**
 * Añadir control Medida al array de controles del panel
 * 
 */
(function($) {
  Drupal.behaviors.st56mapa_control_midedistancia = {
    'attach' : function(context, settings) {
      $('.jmapas-map')
          .once(
              'jmapas-control-midedistancia',
              function() {
                //var map_id = $(this).attr('id');
                var map = $(this).data("st56mapa").map; // settings.st56mapa[map_id].map;
                var map_datos = settings.st56mapa.map_datos;
                var container = map_datos.containers['olmidedistancia'];
                var control = map_datos.controles[container].olmidedistancia;
                var opciones = control.opciones;
                // regla
                var sketchSymbolizers = map_datos.estilos[opciones.style];
                var style = new OpenLayers.Style();
                style.addRules([ new OpenLayers.Rule({
                  symbolizer : sketchSymbolizers
                }) ]);
                var styleMap = new OpenLayers.StyleMap({
                  'default' : style
                });
                ///
                var renderer = OpenLayers.Util
                    .getParameters(window.location.href).renderer;
                renderer = (renderer) ? [ renderer ]
                    : OpenLayers.Layer.Vector.prototype.renderers;
                //
                var olControl = new OpenLayers.Control.Measure(
                    OpenLayers.Handler.Path, {
                      //title : opciones.title,
                      persist : opciones.persist == "true" ? true : false,
                      immediate : opciones.immediate == "true" ? true : false,
                      geodesic : opciones.geodesic == "true" ? true : false,
                      handlerOptions : {
                        layerOptions : {
                          renderers : renderer,
                          styleMap : styleMap
                        }
                      },
                      eventListeners : {
                        deactivate : function() {
//                          Drupal.st56mapa.borrarMedidas();
                          this.deactivate();
                          } // fin deactivate
                      }
                    });
                olControl.events.on({
                  measure : function(e){Drupal.st56mapa.handleMeasurements(e, map)}, //en jmapas-v3.js
                  //measurepartial : function(e) {Drupal.st56mapa.handleMeasurements(e)}
                  activate : function(e) {Drupal.st56mapa.borrarMedidas()}
                });
                //map_datos[container].push(olControl);
                //
                map.addControl(olControl);
                //
                map_datos[container].push(new GeoExt.Action({
                  control: olControl,
                  map: map,
                  toggleGroup: "jtbgxtoolbar",
                  allowDepress: false,
                  //pressed: true,
                  tooltip: opciones.title,
                  tooltipType: 'title',
                  activateOnEnable: true,
                  deactivateOnDisable: true,
                  iconCls: "olControlMeasureItemActive",
                  //check items options
                  group: "jtbgxtoolbar",
                  //checked: true
                }));
              }); //fin de once
    } //fin de attach
  }; //fin de Drupal.behaviors.st56mapa_xxx
})(jQuery);