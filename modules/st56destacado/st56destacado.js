var map;
(function($, Drupal, window, document, undefined) {
    /**
     * Cargar mapa
     * 
     */
  Drupal.behaviors.st56mapa = {
    'attach' : function(context, settings) {
      // context parece que es el documento (el html de la página)
      $('.map_edit_class', context).once(
          'map_edit_class',
          function() {
            OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {                
              defaultHandlerOptions: {
                  'single': true,
                  'double': false,
                  'pixelTolerance': 0,
                  'stopSingle': false,
                  'stopDouble': false
              },

              initialize: function(options) {
                  this.handlerOptions = OpenLayers.Util.extend(
                      {}, this.defaultHandlerOptions
                  );
                  OpenLayers.Control.prototype.initialize.apply(
                      this, arguments
                  ); 
                  this.handler = new OpenLayers.Handler.Click(
                      this, {
                          'click': this.trigger
                      }, this.handlerOptions
                  );
              }, 

              trigger: function(e) {
                  //var lonlat = map.getLonLatFromPixel(e.xy);
                  console.log(e);
                  console.log(this);
                 /* alert("You clicked near " + lonlat.lat + " N, " +
                                            + lonlat.lon + " E");*/
                  var idbase = this.map.div.id;
                  console.log(idbase);
                  var idlon = idbase.replace("map","lon");
                  var idlat = idbase.replace("map","lat");
                  var idzoom = idbase.replace("map","zoom");
                  var idsrs = idbase.replace("map","srs");
                  var centro = map.getCenter();
                  document.getElementById(idlon).value = centro.lon;
                  document.getElementById(idlat).value = centro.lat;
                  document.getElementById(idzoom).value = map.zoom;
                  document.getElementById(idsrs).value = map.projection;
              }

          });
            
           var  map = new OpenLayers.Map({
              div: this.id,
              projection: "EPSG:900913",
              displayProjection: "EPSG:900913",
              numZoomLevels: 18,
              // approximately match Google's zoom animation
              zoomDuration: 10,
          });

          // create Google Mercator layers
          var gphy = new OpenLayers.Layer.Google(
              "Google Physical",
              {type: google.maps.MapTypeId.TERRAIN}
          );
          var gmap = new OpenLayers.Layer.Google(
              "Google Streets", // the default
              {numZoomLevels: 20}
          );
          var ghyb = new OpenLayers.Layer.Google(
              "Google Hybrid",
              {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20}
          );
          var gsat = new OpenLayers.Layer.Google(
              "Google Satellite",
              {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
          );

          /*var limites = new OpenLayers.Layer.WMS(
              "Límites", //capa.name,
              "http://geoservicios.cantabria.es/inspire/services/Limites_Administrativos/MapServer/WMSServer", //capa.url, 
              {
                layers : "0,1", //capa.capas,
                transparent : true,
                format : "image/jpeg", //capa.format,
                crs: "EPSG:4326", //ver capabilities del servicio
             }, 
             {
                isBaseLayer : true,
                displayOutsideMaxExtent : false,
                //attribution : capa.attribution,
             }
          );*/
          map.addLayers([
              gphy, gmap, gsat, ghyb
          ]);
          map.addControl(new OpenLayers.Control.LayerSwitcher());
          map.addControl(new OpenLayers.Control.Permalink());
          map.addControl(new OpenLayers.Control.MousePosition());
          //
          var centro = settings.st56destacado[this.id]['centro'];
          console.log(centro);
          var cp = new OpenLayers.Geometry.Point(centro['lon'], centro['lat']);
          console.log(cp);
          if (centro['srs'] != map.projection) {
              cp.transform(new OpenLayers.Projection(centro['srs']), map.projection);
              console.log(cp);
          }
          if(!map.setCenter(new OpenLayers.LonLat(cp.x, cp.y), centro.zoom)) {
            console.log("maxextente");
            map.zoomToMaxExtent();
          }
          //
          //
            //map.setCenter(new OpenLayers.LonLat(0, 0), 0);
            //map.zoomToMaxExtent();
            
            var click = new OpenLayers.Control.Click();
            map.addControl(click);
            click.activate();            
           // }); //fin de each
          
            
          }); // fin de once-function
    } // fin de attach
  }; // fin de Drupal.behaviors.st56map
  })(jQuery, Drupal, this, this.document);
          