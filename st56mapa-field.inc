<?php
/**
 * @file
 * A field using the Field API.
 *
 * This is updated from Barry Jaspan's presentation at Drupalcon Paris,
 * @link http://acquia.com/community/resources/acquia-tv/intro-field-api-module-developers Video Presentation @endlink
 *
 * Providing a field requires:
 * - Defining a field
 *   - hook_field_info()
 *   - hook_field_schema()
 *   - hook_field_validate()
 *   - hook_field_is_empty()
 *
 * - Defining a formatter for the field (the portion that outputs the field for
 *   display)
 *   - hook_field_formatter_info()
 *   - hook_field_formatter_view()
 *
 * - Defining a widget for the edit form
 *   - hook_field_widget_info()
 *   - hook_field_widget_form()
 *
 * *
 * See @link field_types Field Types API @endlink
 */
/*
 * Descripción del campo
 */
 function st56mapa_field_info() {
   return array(
    'st56mapa' => array(
      'label' => t('Mapa tipo sector56'),
      'description' => t('Crear un mapa temático'),
      'default_widget' => 'st56mapa_widget',
      'default_formatter' => 'st56mapa_formatter_openlayers2',
    ),
  );
 }

 /* function st56mapa_field_validate($entity_type, $entity, $field, $instance, $langcode, $items, &$errors) {
   foreach ($items as $delta => $item) {
     if (empty($item['campo'])) {
       $errors[$field]['campo'][$langcode][$delta][] = array(
           'error' => 'El campo no puede estar vacío',
           'message' => t('Debe seleccionar un campo de tipo Archivo'),
       );
     }
   }
 } */

function st56mapa_field_is_empty($item, $field) {
   return empty($item['lon'] || $item['lat'] || $item['zoom'] || $item['srs']);
 }

 /***********************************************************************
 *  Field Type API: Formatter
 *
 *  These are the api hooks that present formatted (themed) output to the
 *  user.
 **********************************************************************/
 function st56mapa_field_formatter_info() {
  return array (
      'st56mapa_formatter_openlayers2' => array (
          'label' => t ( 'Mapa OpenLayers 2.0' ),
          'field types' => array (
              'st56mapa'
          ),
          'settings' => array (
              'map_projection' => 'EPSG:25830',
              'units' => 'm',
              'extent' => array (
                  'xmin' => 225370.7346,
                  'ymin' => 3849419.9580,
                  'xmax' => 774629.2654,
                  'ymax' => 6914547.3835
              ),
              'restrict' => array (
                  'xmin' => 348669,
                  'ymin' => 4727832,
                  'xmax' => 489456,
                  'ymax' => 4824863
              ),
              'numzoomlevels' => 12,
              'display_projection' => 'EPSG:4326',
              'etiquetas' => array (
                  'baselbl' => 'Fondo de mapa',
                  'datalbl' => 'Datos',
                  'detalles' => 'Detalles'
              )
          )
      )
  );
}

function st56mapa_field_formatter_settings_form($field, $instance, $view_mode, $form, &$form_state) {
  $display = $instance['display'][$view_mode];
  $settings = $display['settings'];
  //
  $element = array(
      'map_projection' => array(
          '#type' => 'textfield',
          '#title' => t('Proyección del mapa'),
          '#default_value' => $settings['map_projection'],
          '#size' => 20,
          '#maxlength' => 20,
          '#description' => t('La proyección del mapa, p.ej: EPSG:25830'),
          '#required' => TRUE,
          ),
      'units' => array(
          '#type' => 'select',
          '#title' => t('Unidades del mapa'),
          '#options' => drupal_map_assoc(array('dd', 'ft', 'inches', 'km', 'm', 'mi')),
          '#default_value' => $settings['units'],
          //'#size' => 5,
          //'#maxlength' => 5,
          '#description' => t('Unidades del mapa, p.ej: m'),
          '#required' => TRUE,
          ),
      'extent' => array(
          '#type' => 'fieldset',
          '#title' => t('Extensión del mapa'),
          '#description' => t('Máxima extensión del mapa, p.ej: Cantabria'),
          'xmin' => array(
              '#type' => 'textfield',
              '#title' => t('Xmin'),
              '#default_value' => $settings['extent']['xmin'],
              '#size' => 15,
              '#maxlength' => 15,
              '#description' => t('Coordenada x mínima'),
              '#required' => TRUE,
          ),
          'ymin' => array(
              '#type' => 'textfield',
              '#title' => t('Ymin'),
              '#default_value' => $settings['extent']['ymin'],
              '#size' => 15,
              '#maxlength' => 15,
              '#description' => t('Coordenada y mínima'),
              '#required' => TRUE,
          ),
          'xmax' => array(
              '#type' => 'textfield',
              '#title' => t('Xmax'),
              '#default_value' => $settings['extent']['xmax'],
              '#size' => 15,
              '#maxlength' => 15,
              '#description' => t('Coordenada x máxima'),
              '#required' => TRUE,
          ),
          'ymax' => array(
              '#type' => 'textfield',
              '#title' => t('Ymax'),
              '#default_value' => $settings['extent']['ymax'],
              '#size' => 15,
              '#maxlength' => 15,
              '#description' => t('Coordenada y máxima'),
              '#required' => TRUE,
          ),
       ),
      'restrict' => array(
          '#type' => 'fieldset',
          '#title' => t('Restricción del mapa'),
          '#description' => t('Restricción del mapa, p.ej: Cantabria'),
          'xmin' => array(
              '#type' => 'textfield',
              '#title' => t('Xmin'),
              '#default_value' => $settings['restrict']['xmin'],
              '#size' => 15,
              '#maxlength' => 15,
              '#description' => t('Coordenada x mínima'),
              '#required' => TRUE,
          ),
          'ymin' => array(
              '#type' => 'textfield',
              '#title' => t('Ymin'),
              '#default_value' => $settings['restrict']['ymin'],
              '#size' => 15,
              '#maxlength' => 15,
              '#description' => t('Coordenada y mínima'),
              '#required' => TRUE,
          ),
          'xmax' => array(
              '#type' => 'textfield',
              '#title' => t('Xmax'),
              '#default_value' => $settings['restrict']['xmax'],
              '#size' => 15,
              '#maxlength' => 15,
              '#description' => t('Coordenada x máxima'),
              '#required' => TRUE,
          ),
          'ymax' => array(
              '#type' => 'textfield',
              '#title' => t('Ymax'),
              '#default_value' => $settings['restrict']['ymax'],
              '#size' => 15,
              '#maxlength' => 15,
              '#description' => t('Coordenada y máxima'),
              '#required' => TRUE,
          ),
       ),
      'numzoomlevels' => array(
          '#type' => 'textfield',
          '#title' => t('Niveles de zoom'),
          '#default_value' => $settings['numzoomlevels'],
          '#size' => 5,
          //'#maxlength' => 5,
          '#description' => t('Niveles de zoom, p.ej: 12'),
          '#required' => TRUE,
      ),
      'display_projection' => array(
          '#type' => 'textfield',
          '#title' => t('Proyección de salida'),
          '#default_value' => $settings['display_projection'],
          '#size' => 20,
          '#maxlength' => 20,
          '#description' => t('La proyección de salida, p.ej: EPSG:4326'),
          '#required' => TRUE,
          ),
      'etiquetas' => array(
          '#type' => 'fieldset',
          '#title' => t('Etiquetas'),
          'baselbl' => array(
              '#type' => 'textfield',
              '#title' => t('Capas base'),
              '#default_value' => $settings['etiquetas']['baselbl'],
              '#size' => 15,
              '#maxlength' => 15,
              '#description' => t('Etiqueta para capas base, p.ej: Fondo de mapa'),
              '#required' => TRUE,
          ),
          'datalbl' => array(
              '#type' => 'textfield',
              '#title' => t('Capas de datos'),
              '#default_value' => $settings['etiquetas']['datalbl'],
              '#size' => 15,
              '#maxlength' => 15,
              '#description' => t('Etiqueta para capas de datos, p.ej: Datos'),
              '#required' => TRUE,
          ),
          'detalles' => array(
              '#type' => 'textfield',
              '#title' => t('Detalles'),
              '#default_value' => $settings['etiquetas']['detalles'],
              '#size' => 15,
              '#maxlength' => 15,
              '#description' => t('Etiqueta para detalles, p.ej: Detalles'),
              '#required' => TRUE,
          ),
     )
  );

  return $element;
}

function st56mapa_field_formatter_settings_summary($field, $instance, $view_mode) {
  $display = $instance['display'][$view_mode];
  $settings = $display['settings'];
  $resumen = array();
  if ($settings['map_projection']) {
    $resumen[] = t('Proyección del mapa: @mp', array('@mp' => $settings['map_projection']));
  }
  if ($settings['units']) {
    $resumen[] = t('Unidades: @mp', array('@mp' => $settings['units']));
  }
  if ($settings['extent']) {
    $resumen[] = t('Extensión del mapa => xmin: @mp1, ymin: @mp2, xmax: @mp3, ymax: @mp4', array(
        '@mp1' => $settings['extent']['xmin'],
        '@mp2' => $settings['extent']['ymin'],
        '@mp3' => $settings['extent']['xmax'],
        '@mp4' => $settings['extent']['ymax'],
    ));
  }
  if ($settings['restrict']) {
    $resumen[] = t('Restricción del mapa => xmin: @mp1, ymin: @mp2, xmax: @mp3, ymax: @mp4', array(
        '@mp1' => $settings['restrict']['xmin'],
        '@mp2' => $settings['restrict']['ymin'],
        '@mp3' => $settings['restrict']['xmax'],
        '@mp4' => $settings['restrict']['ymax'],
    ));
  }
  if ($settings['numzoomlevels']) {
    $resumen[] = t('Niveles de zoom: @mp', array('@mp' => $settings['numzoomlevels']));
  }
  if ($settings['display_projection']) {
    $resumen[] = t('Proyección de salida: @mp', array('@mp' => $settings['display_projection']));
  }
  if ($settings['etiquetas']) {
    $resumen[] = t('Etiquetas => Capas base: @mp1, Capas de datos: @mp2, Detalles: @mp3', array(
        '@mp1' => $settings['etiquetas']['baselbl'],
        '@mp2' => $settings['etiquetas']['datalbl'],
        '@mp3' => $settings['etiquetas']['detalles'],
    ));
  }
  return implode('<br />', $resumen);
}

function st56mapa_field_formatter_view($entity_type, $entity, $field, $instance, $langcode, $items, $display) {
  $element = array ();
  //
  switch ($display['type']) {
    case 'st56mapa_formatter_openlayers2' :
      /* drupal_add_js( 'http://extjs.cachefly.net/ext-3.4.0/adapter/ext/ext-base.js', array (
          'every_page' => FALSE,
          'preprocess' => FALSE
      ) );
      drupal_add_js( 'http://extjs.cachefly.net/ext-3.4.0/ext-all.js', array (
          'every_page' => FALSE,
          'preprocess' => FALSE
      ) ); */
      drupal_add_js( 'sites/all/libraries/ext-3.3.1/adapter/ext/ext-base.js', array (
          'every_page' => FALSE,
          'preprocess' => FALSE
      ) );
      drupal_add_js( 'sites/all/libraries/ext-3.3.1/ext-all.js', array (
          'every_page' => FALSE,
          'preprocess' => FALSE
      ) );
      drupal_add_js( 'sites/all/libraries/OpenLayers/OpenLayers.js', array (
          'every_page' => FALSE,
          'preprocess' => FALSE
      ) );
      drupal_add_js( 'sites/all/libraries/GeoExt/script/GeoExt.js', array (
          'every_page' => FALSE,
          'preprocess' => FALSE
      ) );
      drupal_add_js( drupal_get_path( 'module', 'st56mapa' ) . '/st56mapa-ol2-v1' . ST56MAPA_JS . '.js' );
      //
      //Obtener los nombres de campos de los controles, capas y destacados
      //
      $bundle = $instance['bundle']; //p.ej mapa_pgou
      $fieldlist = field_info_instances( $entity_type, $bundle ); //Definiciones de todos los campos que usa la entidad
      $fieldnames = st56mapa_get_array_field_names($fieldlist);
      //
      //Controles ordenados por tipo de contenedor para pasar a tpl.php
      //
      $controles = array();
      $control_field = $fieldnames['controles']; //Nombre del campo que almacena los controles
      $aux = $entity->$control_field;
      foreach ($aux['und'] as $control) {
        $controles[$control['contenedor']][] = $control['idname'];
      }
      //
      //Capas ordenadas por capasbase y capasdatos
      //
      $capas = array();
      $capa_field = $fieldnames['capas']; //Nombre del campo que almacena las capas
      $aux = $entity->$capa_field; //Todos los deltas del campo
      foreach ($aux['und'] as $capa) {
        $capas[$capa['tipocapa']][] = array(
            'idname' => $capa['idname'],
            'atributos' => array(
                'grupo' => $capa['grupo'],
                'visible' => $capa['visible'],
                'seleccionable' => $capa['seleccionable'],
            ),
        );
      }
      //
      //Destacados
      //
      $aux = st56mapa_get_array_field_names_with_labels($fieldlist);
      $field_destacados = $aux['destacados']; //array [idname] = label del campo p.ej: Ir a para field_destacado1
      $listadestacados = $destacados = array();
      $i = 1;
      foreach ($field_destacados as $idname => $label) {
        $aux2 = $entity->$idname; //todos los deltas del campo
        if ($aux2 == null || count($aux2['und']) == 0) {
          continue;
        }
        $listadestacados[$idname]['label'] = $label;
        $listadestacados[$idname]['divid'] = "map_select_$i"; //Lo utilizams en javascript y tpl.php
        $i++;
        foreach ($aux2['und'] as $destacado) {
          $destacados[$idname][$destacado['idname']]['name'] = $destacado['name'];
          $destacados[$idname][$destacado['idname']]['lon'] = $destacado['lon'];
          $destacados[$idname][$destacado['idname']]['lat'] = $destacado['lat'];
          $destacados[$idname][$destacado['idname']]['zoom'] = $destacado['zoom'];
          $destacados[$idname][$destacado['idname']]['srs'] = $destacado['srs'];
        }
      }
      //
      // Solamente considero un campo por página, o sea $delta = 0
      //
      $element['#attached'] = array (
            'js' => array (
                 'sites/all/libraries/jquery-ui/jquery-ui.js' => array(),
//                'http://extjs.cachefly.net/ext-3.4.0/adapter/ext/ext-base.js', array (
                    //'type' => 'external',
//                    ),
//                 'http://extjs.cachefly.net/ext-3.4.0/ext-all.js', array (
//                     //'type' => 'external',
//                     ),
//                'sites/all/libraries/OpenLayers/OpenLayers.js', array (
                    /* 'every_page' => FALSE,
                    'preprocess' => FALSE */
//                    ),
//                'sites/all/libraries/GeoExt/script/GeoExt.js', array (), //'every_page' => FALSE, 'preprocess' => FALSE),
                //drupal_get_path( 'module', 'st56mapa' ) . '/st56mapa-ol2-v1' . ST56MAPA_JS . '.js' => array(),
            ),
            'css' => array (
                'sites/all/libraries/jquery-ui/jquery-ui.css' => array (),
                /* 'http://extjs.cachefly.net/ext-3.4.0/resources/css/ext-all.css' => array('type'=>'external'),
                'http://extjs.cachefly.net/ext-3.4.0/examples/shared/examples.css' => array('type'=>'external'), */
                'sites/all/libraries/ext-3.3.1/resources/css/ext-all.css' => array(),
//                 'sites/all/libraries/ext-3.3.1/examples/shared/examples.css' => array(),
                'sites/all/libraries/GeoExt/resources/css/geoext-all-debug.css' => array (),
                drupal_get_path( 'module', 'st56mapa' ) . '/css/mapa.css' => array (),
            )
        );
      foreach ( $items as $delta => $item ) {

        $datos = st56mapa_load_datos( $display ['settings'], $controles, $capas, $listadestacados, $destacados );
        if (! $datos) {
          $element[$delta]['#markup'] = '<p> Error al conectar. Inténtelo más tarde</p>';
        } else {
          $map_settings = st56mapa_get_map_settings($display ['settings'], $item);
          //
          $id_mapa = 'map_element';  //NO CAMBIARLO javascript usa ese id
          $element[$delta]['#markup'] = theme( 'st56mapa_formatter_openlayers2_theme', array (
              'id_mapa' => $id_mapa,
              //'destacados' => $datos ['listadedestacados'],
              //'etiqueta_detalles' => $map_settings ['etiquetas'] ['detalles'],
              //'controles' => $datos ['controles'],
              //'busqueda' => drupal_get_form ( 'st56mapa_busqueda_form' ),
              'capasdatos' => $datos ['capadatos']
          ) );
          $js_datos = array (
              'map_id' => $id_mapa,
              'map_name' => $entity->title,
              'map_settings' => $map_settings,
              'map_datos' => $datos
          );
          drupal_add_js( array( 'st56mapa' => $js_datos ), 'setting' );
        }
        // Solo visualizamos el primer campo.
        // Los id no están preparados para múltiples campos
        break;
      }
      break;
  }
  return $element;
}

//
//Obtener los nombres de campos de los controles, capasbase, capasdatos y destacados
//
function st56mapa_get_array_field_names($fieldlist) {
  $fieldnames = array();
  foreach ( $fieldlist as $i => $f ) {
    if ($f ['widget'] ['type'] == 'st56control_widget') {
      $fieldnames['controles'] = $f ['field_name']; // = $f ['label'] //field_st56mapa_control
    }
    else if ( $f ['widget'] ['type'] == 'st56capa_widget') {
      $fieldnames['capas'] = $f ['field_name'];
    }
    else if ( $f ['widget'] ['type'] == 'st56destacado_widget') {
      $fieldnames['destacados'][] = $f ['field_name']; // hasta tres destacados puede haber
    }
  }
  return $fieldnames;
}
//
//Obtener los nombres de campos de los controles, capasbase, capasdatos y destacados
//
function st56mapa_get_array_field_names_with_labels($fieldlist) {
  $fieldnames = array();
  foreach ( $fieldlist as $i => $f ) {
    if ($f ['widget'] ['type'] == 'st56control_widget') {
      $fieldnames['controles'][$f ['field_name']] = $f ['label']; //field_st56mapa_control
    }
    else if ( $f ['widget'] ['type'] == 'st56capa_widget') {
      $fieldnames['capas'][$f ['field_name']] = $f ['label'];
    }
    else if ( $f ['widget'] ['type'] == 'st56destacado_widget') {
      $fieldnames['destacados'][$f ['field_name']]  = $f ['label']; // hasta tres destacados puede haber
    }
  }
  return $fieldnames;
}

function st56mapa_get_map_settings($settings, $item) {
  $map_settings = array();
  $map_settings['map_projection'] = $settings['map_projection'];
  $map_settings['units'] = $settings['units'];
  $map_settings['extent']['xmin'] = (real)$settings['extent']['xmin'];
  $map_settings['extent']['ymin'] = (real)$settings['extent']['ymin'];
  $map_settings['extent']['xmax'] = (real)$settings['extent']['xmax'];
  $map_settings['extent']['ymax'] = (real)$settings['extent']['ymax'];
  $map_settings['restrict']['xmin'] = floatval($settings['restrict']['xmin']);
  $map_settings['restrict']['ymin'] = floatval($settings['restrict']['ymin']);
  $map_settings['restrict']['xmax'] = floatval($settings['restrict']['xmax']);
  $map_settings['restrict']['ymax'] = floatval($settings['restrict']['ymax']);
  $map_settings['numzoomlevels'] = (int)$settings['numzoomlevels'];
  $map_settings['display_projection'] = $settings['display_projection'];
  $map_settings['etiquetas']['baselbl'] = $settings['etiquetas']['baselbl'];
  $map_settings['etiquetas']['datalbl'] = $settings['etiquetas']['datalbl'];
  $map_settings['etiquetas']['detalles'] = $settings['etiquetas']['detalles'];
  //
  $map_settings['center']['lon'] = (real)$item['lon'];
  $map_settings['center']['lat'] = (real)$item['lat'];
  $map_settings['center']['zoom'] = (real)$item['zoom'];
  $map_settings['center']['srs'] = $item['srs'];


  return $map_settings;
}

 /**************************************************************************
 * Field Type API: Widget
 *
 * The widget is the form element used to receive input from the user
 * when the field is being populated.
 **************************************************************************/
 function st56mapa_field_widget_info() {
  return array (
      'st56mapa_widget' => array (
          'label' => t ( 'Definición de st56mapa' ),
          'field types' => array (
              'st56mapa'
          )
      ),
  );
}

 function st56mapa_field_widget_form($form, &$form_state, $field, $instance, $langcode, $items, $delta, $element) {
   if(!isset($form_state['st56mapa']['field_names'])) {
     // Recuperamos los campos del bundle que tiene el campo
     $ent_tipo = $instance['entity_type']; //p.ej node
     $bundle = $instance['bundle']; //p.ej mapa_pgou
     $fieldlist = field_info_instances( $ent_tipo, $bundle );
     //
     $form_state['st56mapa']['fieldnames'] = st56mapa_get_array_field_names_with_labels($fieldlist);
   }

  $element += array (
      '#delta' => $delta
  );

 $element ['lon'] = array (
      '#type' => 'textfield',
      '#default_value' => isset($items[$delta]['lon']) ? $items[$delta]['lon'] : '',
      '#title' => 'Coordenada x del centro del mapa',
      '#maxlength' => 60,
      '#size' => 15,
  );

  $element ['lat'] = array (
      '#type' => 'textfield',
      '#default_value' => isset($items[$delta]['lat']) ? $items[$delta]['lat'] : '',
      '#title' => 'Coordenada y del centro del mapa',
      '#maxlength' => 60,
      '#size' => 15,
  );

  $element ['zoom'] = array (
      '#type' => 'textfield',
      '#default_value' => isset($items[$delta]['zoom']) ? $items[$delta]['zoom'] : '',
      '#title' => 'Zoom de la vista inicial del mapa',
      '#maxlength' => 60,
      '#size' => 15,
  );

  $element ['srs'] = array (
      '#type' => 'textfield',
      '#default_value' => isset($items[$delta]['srs']) ? $items[$delta]['srs'] : 'EPSG:25830',
      '#title' => 'Sistema de referencia',
      '#maxlength' => 30,
      '#size' => 15,
  );

  $element ['controles'] = array (
      '#type' => 'select',
      '#options' => $form_state['st56mapa']['fieldnames']['controles'] ,
      '#default_value' => isset($items[$delta]['controles']) ? $items[$delta]['controles'] : '',
      '#title' => 'Campo que contiene los controles del mapa'
  );

  $element ['capas'] = array (
      '#type' => 'select',
      '#options' => $form_state['st56mapa']['fieldnames']['capas'] ,
      '#default_value' => isset($items[$delta]['capas']) ? $items[$delta]['capas'] : '',
      '#title' => 'Campo que contiene las capas base del mapa'
  );

  foreach(array('destacados1', 'destacados2', 'destacados3') as $destacado) {
    $element [$destacado] = array (
      '#type' => 'select',
      '#options' => $form_state['st56mapa']['fieldnames']['destacados'] ,
      '#default_value' => isset($items[$delta][$destacado]) ? $items[$delta][$destacado] : '',
      '#title' => "Campo que contiene el grupo de $destacado del mapa"
    );
  }

  return $element;
}
