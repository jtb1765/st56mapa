/**
   * Añadir control Referencia catastral al array de controles del panel.
   * Pongo prefijo jtb para distinguirlo de los de OpenLayers (ol) 
   * Al activar el control asignamos una función para gestionar el click 
   * Al desactivar el control desasignamos la función
   * 
   */
(function($) {
  Drupal.behaviors.st56mapa_control_referenciacatastral = {
    'attach' : function(context, settings) {
      $('.jmapas-map').once(
          'jmapas-control-refcat',
          function() {
            //
            // Handler del click según ejemplos de openlayers para
            // dirigir el click a Drupal.st56mapa.referenciacatastral
            //
            OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {
              defaultHandlerOptions : {
                'single' : true,
                'double' : false,
                'pixelTolerance' : 0,
                'stopSingle' : false,
                'stopDouble' : false
              },
              initialize : function(options2) {
                this.handlerOptions = new OpenLayers.Util.extend({},
                    this.defaultHandlerOptions);
                OpenLayers.Control.prototype.initialize.apply(this, arguments);
                this.handler = new OpenLayers.Handler.Click(this, {
                  'click' : Drupal.st56mapa.referenciacatastral
                }, this.handlerOptions);
              }
            }); //FIN de class
            //
            // Añadir el control del click
            //
            //var map_id = $(this).attr('id');
            var map_datos = settings.st56mapa.map_datos;
            var map = $(this).data("st56mapa").map; // settings.st56mapa[map_id].map;
            var click = new OpenLayers.Control.Click();
            map.addControl(click);
            //
            // Añadir el botón que activa/desactiva el click
            //
            var container = map_datos.containers['jtbreferenciacatastral'];
            var controles = map_datos.controles[container];
            var opciones = controles.jtbreferenciacatastral.opciones;
            //control ol
            /*var options = {
              title : opciones.title,
              displayClass : 'jtbRefCat',
              type : OpenLayers.Control.TYPE_TOOL,
              eventListeners : {
                'activate' : function() {
                  click.activate();
                },
                'deactivate' : function() {
                  click.deactivate();
                  // document.getElementById('map_log').innerHTML = "";
                }
              }
            };
             map_datos[container].push(new OpenLayers.Control.Button(options));*/
                      
            map_datos[container].push(new GeoExt.Action({
              control: click,
              map: map,
              toggleGroup: "jtbgxtoolbar",
              allowDepress: false,
              //pressed: true,
              tooltip: opciones.title,
              tooltipType: 'title',
              activateOnEnable: true,
              deactivateOnDisable: true,
              iconCls: "jtbRefCatItemActive",
              //check items options
              group: "jtbgxtoolbar",
              //checked: true
            }));
          }); // fin de once
    } // fin de attach
  }; // fin de Drupal.behaviors.st56mapa_control_navigation
})(jQuery);