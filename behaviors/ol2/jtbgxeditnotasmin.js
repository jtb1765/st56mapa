!function(t){Drupal.behaviors.st56mapa_control_editnotas={attach:function(e,a){t(".jmapas-map").once("jmapas-control-editnotas",function(){var e=t(this).data("st56mapa").map,o=e.getLayersByName("Notas")[0],n=a.st56mapa.map_datos,s=n.containers.jtbgxeditnotas,l=n.controles[s].jtbgxeditnotas.opciones,r={active:"true"==l.active,toggle:"true"==l.toggle,hover:"true"==l.hover,multiple:"true"==l.multiple,multipleKey:l.multipleKey,eventListeners:{activate:function(){o.events.register("featureselected",this,Drupal.st56mapa.on_select_nota),o.events.register("featureunselected",this,Drupal.st56mapa.on_unselect_nota)},deactivate:function(){o.events.un({featureselected:Drupal.st56mapa.on_select_nota,featureunselected:Drupal.st56mapa.on_unselect_nota,scope:this}),t.each(o.selectedFeatures,function(t,e){e.renderIntent="default",o.redraw(e)})}}},i=new OpenLayers.Control.SelectFeature(o,r);e.addControl(i),a.st56mapa.map_datos[s].push(new GeoExt.Action({control:i,map:e,toggleGroup:"jtbgxtoolbar",allowDepress:!1,tooltipType:"title",tooltip:l.title,activateOnEnable:!0,deactivateOnDisable:!0,iconCls:"jtbEditNotasItemActive",group:"jtbgxtoolbar"}))})}}}(jQuery);