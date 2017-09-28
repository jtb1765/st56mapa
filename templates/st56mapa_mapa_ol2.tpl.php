<?php
/**
 * Variables disponibles
 *
 * $id_mapa: identificador del mapa
 * $destacados: grupos de select a implementar
 * $etiqueta_detalles: label para los detalles de features seleccionadas
 * $controles: lista de controles en cada container
 * $busqueda: formulario de busqueda de parcela por referencia catastral
 * $capasdatos: overlay layers
 */
?>
<div id='map_content_wrapper'>
<div id='map_header_wrapper'>
  <table id='jtbopacidadcapas' class='element-invisible w3-modal-content'>
  <tbody>
    <?php foreach ($capasdatos as $idname=>$atributos): ?>
    <?php $name = $atributos['name']; ?>
    <?php $tipo = $atributos['tipo'];?>
    <?php /** if ($tipo != 'wmtscomowms'): */?>
    <tr id=<?php print($idname) ?> >
      <td> <div id= <?php print('slider-' . $idname); ?> ></div></td>
      <td> <input id= <?php print('valor-' . $idname); ?> type="text" readonly maxlength="3" size="2"></td>
      <td id= <?php print('label-' . $idname); ?> class=<?php print($tipo); ?> > <?php print($name); ?></td>
    </tr>
    <?php /* endif; */?>
    <?php endforeach; ?>
  </tbody>
  </table>
</div>
<div id='map_wrapper'>
<div id=<?php print render($id_mapa); ?> class='jmapas-map'></div>
</div>
</div>