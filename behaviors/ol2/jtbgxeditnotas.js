/**
 * Añadir control selectFeature al array de controles del panel al desactivar
 * el control borramos el map_log y cambiamos la última entidad seleccionada
 * no brillante La asignación de funciones a los eventos select y unselect los
 * realizamos al final de la función Volvemos a poner los textos en Detalles,
 * ya que n se puede obtener el punto de selección de la entidad y el cdg
 * donde se dibuja el marcador generalmente no cae dentro de la entidad
 * seleccionada
 * 
 */
(function($) {
  Drupal.behaviors.st56mapa_control_editnotas = {
    'attach' : function(context, settings) {
      $('.jmapas-map')
          .once(
              'jmapas-control-editnotas',
              function() {
                //$("#map_log a.fancybox").fancybox();
                //var map_id = $(this).attr('id');
                var map = $(this).data("st56mapa").map;
                var olCapaNotas = map.getLayersByName('Notas')[0];
                var map_datos = settings.st56mapa.map_datos;
                var container = map_datos.containers['jtbgxeditnotas'];
                var opciones = map_datos.controles[container].jtbgxeditnotas.opciones;
                var options = {
                  active : opciones.active == "true" ? true : false,
                  toggle : opciones.toggle == "true" ? true : false,
                  hover : opciones.hover == "true" ? true : false,
                  multiple : opciones.multiple == "true" ? true : false,
                  multipleKey : opciones.multipleKey,
                  //title : opciones.title,
                  eventListeners : {
                    activate: function() {
                      olCapaNotas.events.register('featureselected', this, Drupal.st56mapa.on_select_nota);
                      olCapaNotas.events.register('featureunselected', this, Drupal.st56mapa.on_unselect_nota);
                      /*olCapaNotas.events.on({
                        featureselected: function(e) {Drupal.st56mapa.on_select_nota(e)},
                        featureunselected: function(e) {Drupal.st56mapa.on_unselect_nota(e)}
                        });*/
                    },
                    deactivate : function() {
                      olCapaNotas.events.un({
                        'featureselected': Drupal.st56mapa.on_select_nota,
                        'featureunselected': Drupal.st56mapa.on_unselect_nota,
                        scope: this
                      });
                      $.each(olCapaNotas.selectedFeatures, function(j, feat) {
                        feat.renderIntent = "default";
                        olCapaNotas.redraw(feat);
                      });
                    } // fin deactivate
                  }
                // fin eventListener
                };
                //
                // Asignamos las funciones asociadas a los eventos, las capas
                // seleccionables ya están cargadas
                //
                /*$.each(map_datos['olcapasseleccionables'], function(i, capa) {
                  capa.events.register('featureselected', this,
                      Drupal.st56mapa.on_select_elemento);
                  capa.events.register('featureunselected', this,
                      Drupal.st56mapa.on_unselect_elemento);
                });*/
                //
                /*map_datos[container].push(new OpenLayers.Control.SelectFeature(
                    map_datos.olcapasseleccionables, options));*/
                //
               
                /*olCapaNotas.events.on({
                  featureselected: function(e) {
                    Drupal.st56mapa.on_select_nota(e)},
                  featureunselected: function(e) {
                    Drupal.st56mapa.on_unselect_nota(e)}
                  });*/
               
                //
                var olControl = new OpenLayers.Control.SelectFeature(olCapaNotas, options); //options);
                map.addControl(olControl);
                //
                settings.st56mapa.map_datos[container].push(new GeoExt.Action({
                  control: olControl,
                  map: map,
                  toggleGroup: "jtbgxtoolbar",
                  allowDepress: false,
                  //pressed: true,
                  tooltipType: 'title',
                  tooltip: opciones.title,
                  activateOnEnable: true,
                  deactivateOnDisable: true,
                  iconCls: "jtbEditNotasItemActive",
                  //check items options
                  group: "jtbgxtoolbar",
                  //checked: true
                }));
                //
              }); //fin de once
    } //fin de attach
  }; //fin de Drupal.behaviors.st56mapa_control_navigation
})(jQuery);