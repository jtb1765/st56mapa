/**
 * Añadir control combo escala Scale al array de controles del panel
 * 
 */
(function($) {
  Drupal.behaviors.st56mapa_control_gxscale = {
    'attach' : function(context, settings) {
      $('.jmapas-map').once('jmapas-control-gxscale', function() {
        //var map_id = $(this).attr('id');
        var map_datos = settings.st56mapa.map_datos;
        var container = map_datos.containers['jtbgxscale'];
        var control = map_datos.controles[container].jtbgxscale;
        ////
        var scaleStore = new GeoExt.data.ScaleStore({map: map});
        var zoomSelector = new Ext.form.ComboBox({
            store: scaleStore,
            emptyText: "Zoom Level",
            tpl: '<tpl for="."><div class="x-combo-list-item">1 : {[parseInt(values.scale)]}</div></tpl>',
            editable: false,
            triggerAction: 'all', // needed so that the combo box doesn't filter by its current content
            mode: 'local' // keep the combo box from forcing a lot of unneeded data refreshes
        });

        zoomSelector.on('select', 
            function(combo, record, index) {
                map.zoomTo(record.data.level);
            },
            this
        );     

        map.events.register('zoomend', this, function() {
            var scale = scaleStore.queryBy(function(record){
                return this.map.getZoom() == record.data.level;
            });

            if (scale.length > 0) {
                scale = scale.items[0];
                zoomSelector.setValue("1 : " + parseInt(scale.data.scale));
            } else {
                if (!zoomSelector.rendered) return;
                zoomSelector.clearValue();
            }
        });

        map_datos[container].push(zoomSelector);
      }); // fin de once
    } // fin de attach
  }; // fin de Drupal.behaviors.st56mapa_xxx
})(jQuery);