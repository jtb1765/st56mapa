 !function(o){Drupal.behaviors.st56mapa_control_navigation={attach:function(t,a){o(".jmapas-map").once("jmapas-control-olnavigation",function(){var t=a.st56mapa.map_datos,n=t.containers.olnavigation,e=t.controles[n].olnavigation,i=(e.opciones.title,o(this).data("st56mapa").map),l=new OpenLayers.Control.Navigation;i.addControl(l);var p=new GeoExt.Action({control:l,map:i,activateOnEnable:!0,deactivateOnDisable:!0,toggleGroup:"jtbgxtoolbar",allowDepress:!1,pressed:!0,iconCls:"olControlNavigationItemActive",tooltipType:"title",tooltip:e.opciones.title,group:"jtbgxtoolbar",checked:!0});t[n].push(new Ext.Button(p))})}}}(jQuery);