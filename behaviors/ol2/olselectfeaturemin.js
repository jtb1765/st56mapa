!function(e){Drupal.behaviors.st56mapa_control_selectfeature={attach:function(t,a){e(".jmapas-map").once("jmapas-control-selectfeature",function(){var t=a.st56mapa.map_datos,o=t.containers.olselectfeature,l=t.controles[o].olselectfeature.opciones,n={active:"true"==l.active,toggle:"true"==l.toggle,hover:"true"==l.hover,multiple:"true"==l.multiple,multipleKey:l.multipleKey,eventListeners:{activate:function(){e.each(t.olcapasseleccionables,function(e,t){t.events.register("featureselected",this,Drupal.st56mapa.on_select_elemento),t.events.register("featureunselected",this,Drupal.st56mapa.on_unselect_elemento)})},deactivate:function(){e.each(t.olcapasseleccionables,function(t,a){a.events.un({featureselected:Drupal.st56mapa.on_select_elemento,featureunselected:Drupal.st56mapa.on_unselect_elemento,scope:this}),e.each(a.selectedFeatures,function(e,t){t.renderIntent="default",t.popup&&t.popup.destroy(),a.redraw(t),noesta=!1})})}}},s=e(this).data("st56mapa").map,c=new OpenLayers.Control.SelectFeature(t.olcapasseleccionables,n);s.addControl(c),a.st56mapa.map_datos[o].push(new GeoExt.Action({control:c,map:s,toggleGroup:"jtbgxtoolbar",allowDepress:!1,tooltipType:"title",tooltip:l.title,activateOnEnable:!0,deactivateOnDisable:!0,iconCls:"olControlSelectFeatureItemActive",group:"jtbgxtoolbar"}))})}}}(jQuery);