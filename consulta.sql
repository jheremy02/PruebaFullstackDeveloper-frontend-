use myschool;
SELECT  CONCAT(nom_persona, ' ', ape_pate_pers,' ',ape_mate_pers) AS estudiante , 
concat(grado.desc_grado,' ',grado.nivel) as `grado-nivel`,
movimiento.monto,fecha_venci,fecha_pago,cronograma.year as año    FROM movimiento
INNER JOIN persona ON persona.nid_persona = movimiento.id_persona
INNER JOIN detalle_cronograma ON
detalle_cronograma.id_detalle_cronograma = movimiento.id_detalle_cronograma
inner join grado on grado.nid_grado=detalle_cronograma.id_grado
inner join cronograma on cronograma.id_cronograma=detalle_cronograma.id_cronograma
where detalle_cronograma.desc_pension!='matricula' order by estudiante and fecha_venci