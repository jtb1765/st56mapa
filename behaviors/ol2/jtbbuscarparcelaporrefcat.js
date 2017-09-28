/**
 * Añadir control Imprimir al array de controles del panel.
 * Pongo prefijo jtb para distinguirlo de los de OpenLayers (ol)
 * 
 */
(function($) {
  Drupal.behaviors.st56mapa_control_buscarparcelaporrefcat = {
    'attach' : function(context, settings) {
      $('.jmapas-map').once('jmapas-control-buscar-parcela-por-refcat', function() {
        //var map_id = $(this).attr('id');
        var map = $(this).data("st56mapa").map;
        var map_datos = settings.st56mapa.map_datos;
        var container = map_datos.containers['jtbbuscarparcelaporrefcat'];
        var opciones = map_datos.controles[container].jtbbuscarparcelaporrefcat.opciones;
        var options = {
          title : opciones.title,
          type : OpenLayers.Control.TYPE_BUTTON,
          displayClass : 'jtbBuscarParcelaPorRefCat',
          trigger : Drupal.st56mapa.buscarparcelaporrefcat
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
          iconCls: "jtbBuscarParcelaPorRefCatItemActive",
          //check items options
          //group: "jtbgxtoolbar",
          //checked: true
        }));
      }); // fin de once
    } // fin de attach
  }; // fin de Drupal.behaviors.st56mapa_control_navigation
})(jQuery);