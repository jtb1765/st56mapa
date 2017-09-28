<?php

/**
 * Funciones auxiliares para librería OpenLayers 2.0 por defecto
 *
 * @param $referencia
 * @return Ambigous <multitype:, unknown>
 */
function st56mapa_load_datos($map_settings, $controles, $capas,  $listadestacados, $destacados) {
  /* $mapa = new DOMDocument();
  if (!$mapa->load($filename) || !$mapa->validate()) {
    return FALSE;
  } */
  $datos = array();
  //
  //Recuperar datos de layers
  //
  if (st56mapa_load_capas($datos, $capas) == NULL) {
    return FALSE;
  }
  //
  //Cargar los lectores de los tipos de capa del mapa
  //
  st56mapa_load_lectores_layers_tipo($datos);
  //
  //Recuperar datos de controles
  st56mapa_load_controles($datos, $controles);
  //
  //Cargar datos de estilos usados en layers y controles del plano
  if (st56mapa_load_estilos($datos) == NULL) {
    return FALSE;
  }
  //
  //Cargars proyecciones diferentes de 4326 y 900913/
  st56mapa_load_proyecciones($datos, $map_settings);
  //
  //Cargar los datos destacados
  st56mapa_load_destacados($datos, $listadestacados, $destacados);
  //
  return $datos;
}

/**
 * Cargar datos de capas
 *
 * @param  $datos para pasar a javascript
 * @param  $capas_mapa lista de capas del mapa actual
 */
function st56mapa_load_capas(&$datos, $capas_mapa) {
  $almacen_capas = new DOMDocument();
  //$almacen_capas->validateOnParse = false;
//   $opts = array(
//       'http' => array(
//           'user_agent' => 'PHP libxml agent',
//       )
//   );
//   $context = stream_context_create($opts);
//   libxml_set_streams_context($context);

  if (!$almacen_capas->load("private://mapas/configuracion/st56mapa_capas_r5.xml") ||
      !$almacen_capas->validate())
  {
    watchdog('jmapas', 'Error al cargar capas');
    return FALSE;
  }
  //
  //$key: capabase, capadatos
  //$listacapasmapa: array con las capas ($capamapa) de cada tipo
  //$capamapa: array( [idname], [atributos] = array( [grupo],[visible],[seleccionable] ))
  //
  foreach ($capas_mapa as $key=>$listacapasmapa) {
    foreach ($listacapasmapa as $capamapa) {
      $capa_id = $capamapa['idname'];
      $capa = $almacen_capas->getElementById($capa_id);
      if($capa == null) {
        return null;
      }
      //
      //atributos del almacen de capas
      //
      $attrs = $capa->attributes;
      foreach($attrs as $att) {
        $datos[$key][$capa_id][$att->nodeName] = $att->nodeValue;
      }
      //
      //atributos del fichero de configuración de mapas,
      //sobreescriben a los anteriores: solo visible y seleccionable
      //y se añade el grupo en el que se incluye la capa
      //
      $attrs = $capamapa['atributos'];
      foreach($attrs as $attname => $attvalue) {
        if ($attvalue != '-1') {
          $datos[$key][$capa_id][$attname] = $attvalue;
        }
      }
      //
      //Cargamos los parámetros definidos en el almacen
      //para usarlos en los detalles del mapa al seleccionar
      //entidades
      //
      if ($key == 'capadatos') {
        $parametros = $capa->getElementsByTagName('parametro');
        foreach($parametros as $parametro) {
          $par_id = $parametro->getAttribute('id');
          $attrs = $parametro->attributes;
          foreach($attrs as $att) {
            $datos['atributos'][$capa_id][$par_id][$att->nodeName] = $att->nodeValue;
          }
        }
      } //fin de if capadatos
    }
  }
  return TRUE;
}
/**
 * Cargar los lectores de los distintos tipos de capas
 *
 * @param  $mapa
 * @param  $datos
 */
function st56mapa_load_lectores_layers_tipo(&$datos) {
  $layers_tipo = array();
  //
  //layers_tipo de capas base (wms, google)
  //
  foreach ($datos['capabase'] as $idcapa=>$values) {
    $tipo = $values['tipo'];
    $layers_tipo[$tipo] = $tipo;
    if($tipo == 'google') {
      drupal_add_js("http://maps.google.com/maps/api/js?sensor=false&v=3.2");
    }
  }
  //
  //layers_tipo de capas vectoriales
  //
  foreach ($datos['capadatos'] as $idcapa=>$values) {
    $tipo = $values['tipo'];
    $layers_tipo[$tipo] = $tipo; //para evitar cargar varias veces el mismo lector
  }
  //
  //Cargamos los lectores correspondientes
  //
  foreach ($layers_tipo as $key=>$value) {
    drupal_add_js(drupal_get_path('module', 'st56mapa') . "/layers/ol2/$value" . ST56MAPA_JS. '.js');
  }
}
/**
 * Consultar a la base de datos y devolver geojson
 * @param unknown $values
 */
/* function st56mapa_consultar_catalogo($values, $codigo_ine) {
	$url = $values['url']; //id del término de taxonomía (reemplazar pot el nombre)
	$srs = $values['crs'];

	$tid = jmapas_get_term_from_name($url, "Inventario");
	watchdog('jmapas', t('%1 => %2', array('%1'=>$url, '%2'=>$tid)));
	//$result = db_query('SELECT n.bundle, n.entity_id, n.field_codigo_ine_value
	//		FROM {field_data_field_codigo_ine} n WHERE n.bundle = :ntype AND n.field_codigo_ine_value = :nine' ,
	//		array(':ntype' => $url, ':nine' => $codigo_ine));
	//
	$nids = taxonomy_select_nodes($tid, FALSE);
	$geojson = '{';
	$geojson .= '"type": "FeatureCollection",';
	$geojson .= '"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:' . $srs . '" } },';
	$geojson .= '"features": [';
	$primera = true;
	foreach ($nids as $index=>$nid) {
	  $node = node_load($nid);

	  if ($srs == $node->field_srsutm['und']['0']['value']) {
	  	if (!$primera) {
	  		$geojson .= ',';
	  	}
	  	//
	    $geojson .= '{ "type": "Feature", "properties": { ';
	    $geojson .= '"ID": "' . $node->field_id2['und']['0']['value'] . '",';
	    $geojson .= '"DENOMINACI": "' . $node->title . '",';
	    if ($node->field_foto1['und']['0']['uri']) {
	    	$uri = $node->field_foto1['und']['0']['uri'];
	    	$path = drupal_realpath($uri);
	    	$pathestilo = image_style_url("medium", $uri);
	    	$geojson .= '"IMG": "' . $pathestilo . '",';
	    }
	    //$geojson .= '"HREF": "/' . $url . '/' . $node->field_id1['und']['0']['value'] . '"},'; //se cierra properties
	    $geojson .= '"HREF": "/node/' . $nid . '"},'; //se cierra properties
	    $geojson .= '"geometry": { "type": "Point", "coordinates": [ ';
	    $geojson .= $node->field_xutm['und']['0']['value'];
	    $geojson .= ', ';
	    $geojson .= $node->field_yutm['und']['0']['value'];
	    $geojson .= '] }'; //cerramos geometry
	    $geojson .= '}'; //cerreamos type
	    //
	    $primera = false;
	  }
	}
	$geojson .= ']}'; //cerramos features y fichero
	//print $geojson;
	return $geojson;
} */
/**
 * Helper function to dynamically get the tid from the term_name
 *
 * @param $term_name Term name
 * @param $vocabulary_name Name of the vocabulary to search the term in
 *
 * @return Term id of the found term or else FALSE
 */
function st56mapa_get_term_from_name($term_name, $vocabulary_name) {
	if ($vocabulary = taxonomy_vocabulary_machine_name_load($vocabulary_name)) {
		$tree = taxonomy_get_tree($vocabulary->vid);
		foreach ($tree as $term) {
			if ($term->name == $term_name) {
				return $term->tid;
			}
		}
	}

	return FALSE;
}
/**
 * Carga los controles del mapa
 *
 * @param  $mapa
 * @param  $datos
 */
/* function st56mapa_load_controles_old($mapa, &$datos) {
  $containers = $mapa->getElementsByTagName('container');
  foreach ($containers as $container) {
    $idcontainer = $container->getAttribute('idname');
    $datos['divids'][$idcontainer]=$container->getAttribute('divid');
    $controles = $container->getElementsByTagName('control');
    foreach ($controles as $control) {
      $idcontrol = $control->getAttribute('idname');
      $datos['containers'][$idcontrol] = $idcontainer;
      //
      //Añadir behaviors
      drupal_add_js(drupal_get_path('module', 'jmapas') . "/behaviors/$idcontrol" . ST56MAPA_JS . '.js');
      //
      $attrs = $control->attributes;
      foreach($attrs as $attr) {
        $datos['controles'][$idcontainer][$idcontrol][$attr->nodeName] = $attr->nodeValue;
      }
      $opciones = $control->getElementsByTagName('opcion');
      foreach ($opciones as $opcion) {
        $datos['controles'][$idcontainer][$idcontrol]['opciones'][$opcion->getAttribute('key')] = $opcion->getAttribute('value');
      }
    }
  }
  //drupal_add_js("http://localhost/siglocal/sites/all/libraries/OpenLayers/lib/OpenLayers/Events/featureclick.js");
} */
/**
 * Carga los controles del mapa en funcion de los controles del almacen de controles
 *
 * @param  $mapa
 * @param  $datos
 * @param  $controles array[contenedor][0...] = control_id
 */
function st56mapa_load_controles(&$datos, $containers_controles_mapa) {
  //
  //Cargar almecen de controles para recuperara atributos y opciones
  //
  $almacen_controles = new DOMDocument();
  if (!$almacen_controles->load("private://mapas/configuracion/st56mapa_controles.xml") ||
    !$almacen_controles->validate()) {
      watchdog('jmapas', 'Error al cargar controles');
    return FALSE;
  }
  //
  foreach ($containers_controles_mapa as $idcontainer => $controles) {
    $container_almacen = $almacen_controles->getElementById($idcontainer);
    $datos['divids'][$idcontainer] = $container_almacen->getAttribute('divid');
    foreach ($controles as $idcontrol) {
      $control_almacen = $almacen_controles->getElementById($idcontrol);
      $datos['containers'][$idcontrol] = $idcontainer;
      //
      //Añadir behaviors
      //
      drupal_add_js(drupal_get_path('module', 'st56mapa') . "/behaviors/ol2/$idcontrol" . ST56MAPA_JS . '.js');
      //
      //Cargar atributos y opciones del control del almacén de controles
      //
      $control_almacen = $almacen_controles->getElementById($idcontrol);
      $attrs = $control_almacen->attributes;
      foreach($attrs as $attr) {
        $datos['controles'][$idcontainer][$idcontrol][$attr->nodeName] = $attr->nodeValue;
      }
      $opciones = $control_almacen->getElementsByTagName('opcion');
      foreach ($opciones as $opcion) {
        $datos['controles'][$idcontainer][$idcontrol]['opciones'][$opcion->getAttribute('key')] = $opcion->getAttribute('value');
      }
    }
  }
}
/**
 * Cargar estilos del mapa
 *
 * @param  $mapa
 * @param  $datos
 */
function st56mapa_load_estilos(&$datos) {
  $estilos = new DOMDocument();
  if (!$estilos->load("private://mapas/configuracion/st56mapa_estilos.xml") ||
      !$estilos->validate()) {
    watchdog('jmapas', t('Estilos. Fichero xml no válido', array()));
    return FALSE;
  }
  //Estilos de capas
  $listaDeEstilos = array();
  foreach ($datos['capadatos'] as $key=>$value) {
    if (isset($value['estilo_name'])) {
     $listaDeEstilos[$value['estilo_name']] = $value['estilo_name'];
   }
  }
  //Estilos de controles (para medidas de longitud y area)
  foreach ($datos['containers'] as $idcontrol=>$idcontainer) {
    if (isset($datos['controles'][$idcontainer][$idcontrol]['opciones']['style'])) {
      $estilo = $datos['controles'][$idcontainer][$idcontrol]['opciones']['style'];
      $listaDeEstilos[$estilo] = $estilo;
    }
  }
  //$listaDeEstilos = $mapa->getElementsByTagName('idestilo');
  foreach ($listaDeEstilos as $itemid=>$idname) {
    //$idname = $itemid->nodeValue;
  	$simbolospath = "/" . drupal_get_path('module', 'st56mapa') . "/simbolos/";
    $estilo = $estilos->getElementById($idname);
    $tipo = $estilo->getAttribute('tipo');
    if($tipo == "1") {
      $itemestilos = $estilo->getElementsByTagName('itemestilo');
      foreach ($itemestilos as $itemestilo) {
        $key = $itemestilo->getAttribute('key');
        $propiedades = $itemestilo->getElementsByTagName('propiedades');
        foreach($propiedades as $item) {
          $attrs = $item->attributes;
          foreach ($attrs as $att) {
            $value = $att->nodeValue;
            $value = is_numeric($value) ? floatval($value) : $value;
            //Modificar path de externalGraphic
            if($att->nodeName == "externalGraphic") {
            	$value = $simbolospath . $value;
            }
            $datos['estilos'][$idname][$key][$att->nodeName] = $value; //$att->nodeValue;
          }
        }
      } //foreach itemestilos
    }
    elseif ($tipo == "0") {
      $propiedades = $estilo->getElementsByTagName('propiedades');
      foreach ($propiedades as $item) {
        $attrs = $item->attributes;
        foreach ($attrs as $att) {
          $value = $att->nodeValue;
          $value = is_numeric($value) ? floatval($value) : $value;
        //Modificar path de externalGraphic
            if($att->nodeName == "externalGraphic") {
            	$value = $simbolospath . $value;
            }
          $datos['estilos'][$idname][$att->nodeName] = $value;//$att->nodeValue;
        }
      }
    } //fin de elseif $tipo 0
  } //fin de foreach $listaDeEstilos
  return TRUE;
}

function st56mapa_load_estilos_2($listaDeEstilos, &$datos) {
  $almacen_estilos = new DOMDocument();
  if (!$almacen_estilos->load("private://mapas/configuracion/st56mapa_estilos.xml") ||
      !$almacen_estilos->validate()) {
    return FALSE;
  }
  foreach ($listaDeEstilos as $itemid=>$idname) {
    //$idname = $itemid->nodeValue;
  	$simbolospath = "/" . drupal_get_path('module', 'st56mapa') . "/simbolos/";
    $estilo = $almacen_estilos->getElementById($idname);
    $tipo = $estilo->getAttribute('tipo');
    //
    if($tipo == "1") {
      $itemestilos = $estilo->getElementsByTagName('itemestilo');
      foreach ($itemestilos as $itemestilo) {
        $key = $itemestilo->getAttribute('key');
        $propiedades = $itemestilo->getElementsByTagName('propiedades');
        foreach($propiedades as $item) {
          $attrs = $item->attributes;
          foreach ($attrs as $att) {
            $value = $att->nodeValue;
            $value = is_numeric($value) ? floatval($value) : $value;
            //Modificar path de externalGraphic
            if($att->nodeName == "externalGraphic") {
            	$value = $simbolospath . $value;
            }
            $datos['estilos'][$idname][$key][$att->nodeName] = $value; //$att->nodeValue;
          }
        }
      } //foreach itemestilos
    }
    elseif ($tipo == "0") {
      $propiedades = $estilo->getElementsByTagName('propiedades');
      foreach ($propiedades as $item) {
        $attrs = $item->attributes;
        foreach ($attrs as $att) {
          $value = $att->nodeValue;
          $value = is_numeric($value) ? floatval($value) : $value;
        //Modificar path de externalGraphic
            if($att->nodeName == "externalGraphic") {
            	$value = $simbolospath . $value;
            }
          $datos['estilos'][$idname][$att->nodeName] = $value;//$att->nodeValue;
        }
      }
    } //fin de elseif $tipo 0
  } //fin de foreach $listaDeEstilos
}
/**
 * Carga destacados
 *
 * @param  $mapa
 * @param  $datos
 */
function st56mapa_load_destacados(&$datos, $listadestacados, $destacados) {
  /* $destacados = $mapa->getElementsByTagName('destacado');
  $listaDeDestacados=array();
  foreach ($destacados as $destacado) {
    $idname = $destacado->getAttribute('idname');
    $label = $destacado->getAttribute('label');
    $divid = $destacado->getAttribute('divid');
    $listaDeDestacados[$idname]['label'] = $label;
    $listaDeDestacados[$idname]['divid'] = $divid;
    $nucleos = $destacado->getElementsByTagName('nucleo');
    foreach ($nucleos as $nucleo) {
      $idnucleo = $nucleo->getAttribute('idname');
      $attrs = $nucleo->attributes;
      foreach($attrs as $att) {
        $datos['destacados'][$idname][$idnucleo][$att->nodeName] = $att->nodeValue;
      }
    }
  } */
  $datos['listadedestacados']=$listadestacados;
  $datos['destacados'] = $destacados;
}
/**
 * Cargar proyecciones distintas de las tipo
 *
 * @param  $mapa
 * @param  $datos
 */
function st56mapa_load_proyecciones(&$datos, $map_settings) {
  $proyecciones = array();
  //
  //proyecciones del mapa
  $proyecciones[$map_settings['map_projection']] = $map_settings['map_projection'];
  $proyecciones[$map_settings['display_projection']] = $map_settings['display_projection'];
  //
  //proyecciones de capas vectoriales
  foreach ($datos['capadatos'] as $idcapa=>$values) {
    if (isset( $values['crs'])) {
      $proyeccion = $values['crs'];
      $proyecciones[$proyeccion] = $proyeccion;
    }
  }
  //
  //Proyecciones de controles
  foreach ($datos['containers'] as $idcontrol=>$idcontainer) {
    if (isset($datos['controles'][$idcontainer][$idcontrol]['opciones']['displayProjection'])) {
      $proyeccion = $datos['controles'][$idcontainer][$idcontrol]['opciones']['displayProjection'];
      $proyecciones[$proyeccion] = $proyeccion;
    }
  }
  //
  drupal_add_js(ST56MAPA_LIBRARIES . '/proj4js/lib/proj4js-combined.js');
  foreach ($proyecciones as $key=>$value) {
    switch ($key) {
      case 'EPSG:900913':
      case 'EPSG:4326':
        break;
      default:
        $value = str_replace(':', '', $value);
        drupal_add_js(ST56MAPA_LIBRARIES . "/proj4js/defs/$value.js");
    }
  }
}
