/**
 * Añadir control de Medida al array de controles del panel
 * 
 */
(function($) {
  Drupal.behaviors.st56mapa_control_midesuperficie = {
    'attach' : function(context, settings) {
      $('.jmapas-map')
          .once(
              'jmapas-control-midesuperficie',
              function() {
                //var map_id = $(this).attr('id');
                var map = $(this).data("st56mapa").map; // settings.st56mapa[map_id].map;
                var map_datos = settings.st56mapa.map_datos;
                var container = map_datos.containers['olmidesuperficie'];
                var control = map_datos.controles[container].olmidesuperficie;
                var opciones = control.opciones;
                // regla
                var sketchSymbolizers = map_datos.estilos[opciones.style];
                var style = new OpenLayers.Style();
                var rule = [];
                rule['symbolizer'] = sketchSymbolizers;
                style.addRules([ new OpenLayers.Rule(rule) ]);
                var styleMap = new OpenLayers.StyleMap({
                  "default" : style
                });
                //
                var renderer = OpenLayers.Util
                    .getParameters(window.location.href).renderer;
                renderer = (renderer) ? [ renderer ]
                    : OpenLayers.Layer.Vector.prototype.renderers;
                //
                var control_mide_superficie = new OpenLayers.Control.Measure(
                    OpenLayers.Handler.Polygon, {
                      title : opciones.title,
                      persist : opciones.persist == "true" ? true : false,
                      immediate : opciones.immediate == "true" ? true : false,
                      geodesic : opciones.geodesic == "true" ? true : false,
                      //displayClass : opciones.displayClass,
                      type: OpenLayers.Control.TYPE_TOOL,
                      handlerOptions : {
                        layerOptions : {
                          renderers : renderer,
                          styleMap : styleMap
                        }
                      },
                      eventListeners : {
                        deactivate : function() {
                          this.deactivate();
                          } // fin deactivate
                      }
                    });
                control_mide_superficie.events.on({
                  measure : function(e) {Drupal.st56mapa.handleMeasurements(e, map)}, //en jmapas-v3.js
                  /*"measurepartial" : Drupal.st56mapa.handleMeasurements,
                  deactivate : Drupal.st56mapa.borrarMedidas*/
                });
                //map_datos[container].push(control_mide_superficie);
                 map.addControl(control_mide_superficie);
                //
                map_datos[container].push(new GeoExt.Action({
                  control: control_mide_superficie,
                  map: map,
                  toggleGroup: "jtbgxtoolbar",
                  allowDepress: false,
                  //pressed: true,
                  tooltip: opciones.title,
                  tooltipType: 'title',
                  activateOnEnable: true,
                  deactivateOnDisable: true,
                  iconCls: "olControlMeasure2ItemActive",
                  //check items options
                  group: "jtbgxtoolbar",
                  //checked: true
                }));
              }); //fin de once
    } //fin de attach
  }; //fin de Drupal.behaviors.st56mapa_xxx
})(jQuery);