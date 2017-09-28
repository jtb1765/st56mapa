 /**
 * Añadir control geolocate al array de controles del panel al desactivar el
 * control borramos el map_log y cambiamos la última entidad seleccionada no
 * brillante La asignación de funciones a los eventos select y unselect los
 * realizamos en el correspondiente lector de capas
 * 
 */
(function($) {
  Drupal.behaviors.st56mapa_control_geolocate = {
    'attach' : function(context, settings) {
      $('.jmapas-map')
          .once(
              'jmapas-control-geolocate',
              function() {
                //var map_id = $(this).attr('id');
                var map_datos = settings.st56mapa.map_datos;
                var map = $(this).data("st56mapa").map;
                var container = map_datos.containers['olgeolocate'];
                // Las opciones cargadas del fichero de configuración
                var opciones = map_datos.controles[container].olgeolocate.opciones;
                // Las opciones parea crear el control
                var options = {
                  active : opciones.active == "true" ? true : false,
                  toggle : opciones.toggle == "true" ? true : false,
                  hover : opciones.hover == "true" ? true : false,
                  // multiple: opciones.multiple == "true" ? true : false,
                  // multipleKey: opciones.multipleKey,
                  title : opciones.title,
                  // displayClass: 'olGeoLocate',
                  geolocationOptions : {
                    enableHighAccuracy : opciones.enableHighAccuracy == "true" ? true
                        : false,
                    maximumAge : parseInt(opciones.maximumAge),
                    timeout : parseInt(opciones.timeout)
                  },
                  eventListeners : {
                    activate : function() {
                      // Al activar hacemos visible la capa Marcadores
                      var capamarcadores = map.getLayersByName('Marcadores')[0];
                      capamarcadores.setVisibility(true);
                    },
                    //
                    deactivate : function() {
                      document.getElementById('map_log').innerHTML = "";
                    }, // fin deactivate
                    //
                    locationupdated : function(e) {
                      console.log(e);
                      //var map = $(this).data("st56mapa").map;
                      //
                      // dibujo del margen de error
                      //
                      var precision = e.position.coords.accuracy;
                      var circulo = new OpenLayers.Geometry.Polygon.createRegularPolygon(
                          new OpenLayers.Geometry.Point(e.point.x, e.point.y),
                          precision / 2, 50, 0);
                      var vectorPosition = new OpenLayers.Feature.Vector(
                          circulo, null, {
                            fillOpacity : 0.1,
                            fillColor : '#000',
                            strokeColor : "#f00",
                            strokeOpacity : 0.6
                          });
                      var capamarcadores = map.getLayersByName('Marcadores')[0];
                      capamarcadores.addFeatures([ vectorPosition ]);
                      //
                      // Dibujo del marcador
                      //
                      var lonlat = new OpenLayers.LonLat(e.point.x, e.point.y);
                      var id = Drupal.st56mapa.dibujaMarcador(map, lonlat,
                          "Usted está aquí", "gold", "");
                    }, // fin de location updated
                    //
                    locationfailed : function() {
                      var error = Drupal.theme.prototype
                          .error("Fallo al buscar su localización");
                      document.getElementById('map_log').innerHTML = error;
                    },
                    //
                    locationuncapable : function() {
                      var error = Drupal.theme.prototype
                          .error("No se puede encontrar su localización");
                      document.getElementById('map_log').innerHTML = error;
                    }
                  } //fin eventListener
                }; //fin de var options
                //
                map_datos[container].push(new OpenLayers.Control.Geolocate(options));
              }); //fin de once
    } //fin de attach
  }; //fin de Drupal.behaviors.st56mapa_control_navigation
})(jQuery);