/**
 * Añadir control combo escala Scale al array de controles del panel
 * 
 */
(function($) {
  Drupal.behaviors.st56mapa_control_jtbgxdestacados = { 
    'attach' : function(context, settings) {
      $('.jmapas-map').once('jmapas-control-jtbgxdestacados', function() {
        //
        var map = $(this).data("st56mapa").map;
        var map_datos = settings.st56mapa.map_datos;
        var container = map_datos.containers['jtbgxdestacados'];
        var control = map_datos.controles[container].jtbgxdestacados;
        //
        //Recorrer los destacados: field_destacados1_st56mapa, field_destacados2_st56mapa, field_destacados3_st56mapa, 
        //
//        console.log('JTBGXDESTACADOS');
        $.each(map_datos['destacados'], function(key, destacados) {
          //key: field_destacados1_st56mapa
          //destacados: matriz con todos los destacados del key 
          var titulo_combo = map_datos['listadedestacados'][key].label;
          //
          //crear el store con el array de los datos del combo
          //
          var destacadosArray = [];
          $.each(destacados, function(key, destacado) {
            var destacadoArray = [ destacado.name, parseFloat(destacado.lon), parseFloat(destacado.lat), parseFloat(destacado.zoom), destacado.srs ];
            destacadosArray.push(destacadoArray);
          });
          var destacadosStore = new Ext.data.ArrayStore({
            fields : [ 'name', 'lon', 'lat', 'zoom', 'srs' ],
            idIndex : 0
          });
          destacadosStore.loadData(destacadosArray);
          //
          //Crear el selector
          //
//          console.log('destacadosStore');
//          console.log(destacadosStore);
          var destacadoSelector = new Ext.form.ComboBox({
            store : destacadosStore,
            emptyText : titulo_combo,
            tpl : '<tpl for="."><div class="x-combo-list-item">{[values.name]}</div></tpl>',
            editable : false,
            triggerAction : 'all', // needed so that the combo box doesn't filter by its current content
            mode : 'local', // keep the combo box from forcing a lot of unneeded data refreshes
            cls: 'jtbgxdestacado',
          });
//          console.log('destacadoSelector');
//          console.log(destacadoSelector);
          destacadoSelector.on('select', function(combo, record, index) {
//            console.log('OnChange');
//            console.log(combo);
//            console.log(record);
//            console.log(index);
            var cp = new OpenLayers.Geometry.Point(record.data.lon, record.data.lat);
            if (record.data.srs != map.projection) {
              cp.transform(new OpenLayers.Projection(record.data.srs), map.projection);
            }
            map.setCenter(new OpenLayers.LonLat(cp.x, cp.y), record.data.zoom);
            destacadoSelector.setValue(record.data.name);
          }, this);
          //
          map.events.register('zoomend', this, function() {
            destacadoSelector.clearValue();
          });
          map_datos[container].push(destacadoSelector);
        });//fin de each map_datos
      }); // fin de once
    } // fin de attach
  }; // fin de Drupal.behaviors.st56mapa_xxx
})(jQuery);