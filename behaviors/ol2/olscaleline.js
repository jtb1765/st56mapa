/**
 * Añadir control ScaleLine al array de controles del panel
 * 
 */
(function($) {
  Drupal.behaviors.st56mapa_control_scaleline = {
    'attach' : function(context, settings) {
      $('.jmapas-map').once('jmapas-control-scaleline', function() {
       // var map_id = $(this).attr('id');
        var map = $(this).data("st56mapa").map;
        var map_datos = settings.st56mapa.map_datos;
        var container = map_datos.containers['olscaleline'];
        var control = map_datos.controles[container].olscaleline;
        var options = {
          maxWidth : parseInt(control.opciones.maxWidth),
          //div : document.getElementById(control.divid),
        };
       // map_datos[container].push(new OpenLayers.Control.ScaleLine(options));
        var control = new OpenLayers.Control.ScaleLine(options);
        map.addControl(control);
        //map_datos[container].push(new OpenLayers.Control.Button(options));
        /*map_datos[container].push(new GeoExt.Action({
          text:"",
          control: control,
          map: map,
          //enableToggle: true,
          //toggleGroup: "jtbgxtoolbar",
          //allowDepress: true,
          //pressed: true,
          tooltip: opciones.title,
          //activateOnEnable: true,
          //deactivateOnDisable: true,
          iconCls: "jtbImprimirItemInactive",
          //check items options
          //group: "jtbgxtoolbar",
          //checked: true
        }));*/
      }); // fin de once
    } // fin de attach
  }; // fin de Drupal.behaviors.st56mapa_xxx
})(jQuery);