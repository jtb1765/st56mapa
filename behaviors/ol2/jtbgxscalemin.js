!function(e){Drupal.behaviors.st56mapa_control_gxscale={attach:function(t,a){e(".jmapas-map").once("jmapas-control-gxscale",function(){var e=a.st56mapa.map_datos,t=e.containers.jtbgxscale,o=(e.controles[t].jtbgxscale,new GeoExt.data.ScaleStore({map:map})),l=new Ext.form.ComboBox({store:o,emptyText:"Zoom Level",tpl:'<tpl for="."><div class="x-combo-list-item">1 : {[parseInt(values.scale)]}</div></tpl>',editable:!1,triggerAction:"all",mode:"local"});l.on("select",function(e,t,a){map.zoomTo(t.data.level)},this),map.events.register("zoomend",this,function(){var e=o.queryBy(function(e){return this.map.getZoom()==e.data.level});if(e.length>0)e=e.items[0],l.setValue("1 : "+parseInt(e.data.scale));else{if(!l.rendered)return;l.clearValue()}}),e[t].push(l)})}}}(jQuery);