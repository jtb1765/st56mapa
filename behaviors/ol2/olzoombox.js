/**
 * Añadir control ZoomBox al array de controles del panel
 * 
 */
(function($) {
  Drupal.behaviors.st56mapa_control_zoombox = {
    'attach' : function(context, settings) {
      $('.jmapas-map').once('jmapas-control-olzoombox', function() {
        //var map_id = $(this).attr('id');
        var map_datos = settings.st56mapa.map_datos;
        var container = map_datos.containers['olzoombox'];
        var opciones = map_datos.controles[container].olzoombox.opciones;
        var options = {
          title : opciones.title,
        };
        //map_datos[container].push(new OpenLayers.Control.ZoomBox(options));
        var map = $(this).data("st56mapa").map; // settings.st56mapa[map_id].map;
        var olControl = new OpenLayers.Control.ZoomBox(); //options);
        map.addControl(olControl);
        //
        map_datos[container].push(new GeoExt.Action({
          text: "",
          control: olControl,
          map: map,
          toggleGroup: "jtbgxtoolbar",
          allowDepress: false,
          //pressed: true,
          tooltip: opciones.title,
          tooltipType: 'title',
          activateOnEnable: true,
          deactivateOnDisable: true,
          iconCls: "olControlZoomBoxItemActive",
          //check items options
          group: "jtbgxtoolbar",
          //checked: true
        }));
      }); // fin de once
    } // fin de attach
  }; // fin de Drupal.behaviors.st56mapa_control_navigation
})(jQuery);