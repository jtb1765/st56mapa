!function(e){Drupal.behaviors.st56mapa_control_midesuperficie={attach:function(t,a){e(".jmapas-map").once("jmapas-control-midesuperficie",function(){var t=e(this).data("st56mapa").map,r=a.st56mapa.map_datos,o=r.containers.olmidesuperficie,n=r.controles[o].olmidesuperficie.opciones,s=r.estilos[n.style],i=new OpenLayers.Style,l=[];l.symbolizer=s,i.addRules([new OpenLayers.Rule(l)]);var p=new OpenLayers.StyleMap({default:i}),c=OpenLayers.Util.getParameters(window.location.href).renderer;c=c?[c]:OpenLayers.Layer.Vector.prototype.renderers;var d=new OpenLayers.Control.Measure(OpenLayers.Handler.Polygon,{title:n.title,persist:"true"==n.persist,immediate:"true"==n.immediate,geodesic:"true"==n.geodesic,type:OpenLayers.Control.TYPE_TOOL,handlerOptions:{layerOptions:{renderers:c,styleMap:p}},eventListeners:{deactivate:function(){this.deactivate()}}});d.events.on({measure:function(e){Drupal.st56mapa.handleMeasurements(e,t)}}),t.addControl(d),r[o].push(new GeoExt.Action({control:d,map:t,toggleGroup:"jtbgxtoolbar",allowDepress:!1,tooltip:n.title,tooltipType:"title",activateOnEnable:!0,deactivateOnDisable:!0,iconCls:"olControlMeasure2ItemActive",group:"jtbgxtoolbar"}))})}}}(jQuery);