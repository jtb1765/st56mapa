 /**
 * Añadir control Navigation al array de controles del panel
 * 
 */
(function($) {
  Drupal.behaviors.st56mapa_control_navigation = {
    'attach' : function(context, settings) {
      $('.jmapas-map').once(
          'jmapas-control-olnavigation',
          function() {
            var map_datos = settings.st56mapa.map_datos;
            var container = map_datos.containers['olnavigation'];
            var control = map_datos.controles[container].olnavigation;
            var options = {
              title : control.opciones.title,
            };
            //
            /*map_datos[container]
                .push(new OpenLayers.Control.Navigation(options));*/
            //
            var map = $(this).data("st56mapa").map; // settings.st56mapa[map_id].map;
            var olControl = new OpenLayers.Control.Navigation(); //options);
            map.addControl(olControl);
            //
            var action = new GeoExt.Action({
              control: olControl,
              map: map,
              activateOnEnable: true,
              deactivateOnDisable: true,
              //
              toggleGroup: "jtbgxtoolbar",
              allowDepress: false,
              pressed: true,
              iconCls: "olControlNavigationItemActive",
              tooltipType: 'title',
              tooltip: control.opciones.title,
              //check items options
              group: "jtbgxtoolbar",
              checked: true
            });
            map_datos[container].push(new Ext.Button(action));
          }); // fin de once
    } //fin de attach
  }; //fin de Drupal.behaviors.st56mapa_control_navigation
})(jQuery);