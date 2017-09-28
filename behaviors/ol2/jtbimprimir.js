/**
 * Añadir control Imprimir al array de controles del panel.
 * Pongo prefijo jtb para distinguirlo de los de OpenLayers (ol)
 * 
 */
(function($) {
  Drupal.behaviors.st56mapa_control_imprimir = {
    'attach' : function(context, settings) {
      $('.jmapas-map').once('jmapas-control-imprimir', function() {
        //var map_id = $(this).attr('id');
        var map = $(this).data("st56mapa").map;
        var map_datos = settings.st56mapa.map_datos;
        var container = map_datos.containers['jtbimprimir'];
        var opciones = map_datos.controles[container].jtbimprimir.opciones;
        var options = {
          title : opciones.title,
          type : OpenLayers.Control.TYPE_BUTTON,
          displayClass : 'jtbImprimir',
          trigger : Drupal.st56mapa.imprimir
        };
        var control = new OpenLayers.Control.Button(options);
        map.addControl(control);
        //map_datos[container].push(new OpenLayers.Control.Button(options));
        map_datos[container].push(new GeoExt.Action({
          control: control,
          map: map,
          //enableToggle: true,
          //toggleGroup: "jtbgxtoolbar",
          //allowDepress: true,
          //pressed: true,
          tooltip: opciones.title,
          tooltipType: 'title',
          //activateOnEnable: true,
          //deactivateOnDisable: true,
          iconCls: "jtbImprimirItemInactive",
          //check items options
          //group: "jtbgxtoolbar",
          //checked: true
        }));
      }); // fin de once
    } // fin de attach
  }; // fin de Drupal.behaviors.st56mapa_control_navigation
})(jQuery);