<?php
date_default_timezone_set('America/Lima');
setlocale(LC_ALL,"es_ES@euro","es_ES","esp");
$hora = date("g:i:s A");

require __DIR__ . '/num_letras.php';
require __DIR__ . '/autoload.php';
require __DIR__ . '/phpqrcode/qrlib.php';

use Mike42\Escpos\Printer;
use Mike42\Escpos\EscposImage;
use Mike42\Escpos\PrintConnectors\WindowsPrintConnector;

$date = date('d-m-Y H:i:s');
$data = json_decode($_GET['data'],true);

//AQUI CAMBIAR EL NOMBRE DE LA PC, NOMBRE IMPRESORA
$connector = new WindowsPrintConnector("smb://DESKTOP-FF889QJ/CAJA");
$printer = new Printer($connector);
$copias = 1;
try {
	
for($i = 0; $i < $copias; $i++){

	///////////////descomentar esto para logo
	$logo = EscposImage::load("logo.png", false);
   	$printer -> setJustification(Printer::JUSTIFY_CENTER);
	$printer -> bitImage($logo);
	$printer -> feed();

	 $printer -> text("===============================================\n");
	///////////////hasta aqui descomentar esto para logo

	$printer -> setJustification(Printer::JUSTIFY_CENTER);
	$printer -> setEmphasis(true);

	$printer -> text(utf8_decode($data['Empresa']['nombre_comercial'])."\n");
	$printer -> text(utf8_decode($data['Empresa']['razon_social'])."\n");
	$printer -> setEmphasis(false);
	$printer -> text("RUC: ".utf8_decode($data['Empresa']['ruc'])."\n");

	if ($data['Empresa']['direccion_comercial']!='-') {
		$printer -> text(utf8_decode($data['Empresa']['direccion_comercial'])."\n");
	}

	if ($data['Empresa']['celular']!='') {
		$printer -> text("TELF: ".utf8_decode($data['Empresa']['celular'])."\n");
	}

	$printer -> setJustification(Printer::JUSTIFY_CENTER);
	$printer -> text("-----------------------------------------------\n");

	$elec = (($data['id_tdoc'] == 1 || $data['id_tdoc'] == 2) && $data['Empresa']['sunat'] == 1) ? 'ELECTRONICA' : '';
	$printer -> text($data['desc_td']." ".$elec."\n");
	$printer -> text($data['ser_doc']."-".$data['nro_doc']."\n");
	$printer -> text("-----------------------------------------------\n");
	$printer -> selectPrintMode();
	$printer -> setJustification(Printer::JUSTIFY_LEFT);
	$printer -> text("FECHA DE EMISION: ".date('d-m-Y h:i A',strtotime($data['fec_ven']))."\n");
	
	if($data['id_tped'] == 1){
		$tipo_atencion = utf8_decode($data['Pedido']['desc_salon']).' - MESA: '.utf8_decode($data['Pedido']['nro_mesa']);
	}else if ($data['id_tped'] == 2){
		$tipo_atencion = "MOSTRADOR";
	}else if ($data['id_tped'] == 3){
		$tipo_atencion = "DELIVERY";
	}
	$printer -> text("TIPO DE ATENCION: ".$tipo_atencion."\n");
	$printer -> text("------------------------------------------------\n");

	$printer -> setEmphasis(true);
	$printer -> text("CLIENTE: ".utf8_decode($data['Cliente']['nombre'])."\n");


	if ($data['Cliente']['tipo_cliente'] == 1){
		$printer -> text("DNI: ".$data['Cliente']['dni']."\n");
	}else if ($data['Cliente']['tipo_cliente'] == 2){
		$printer -> text("RUC: ".$data['Cliente']['ruc']."\n");
	}
	$printer -> setEmphasis(false);

	if ($data['Cliente']['direccion']!='-') {
		$printer -> text("DIRECCION: ".utf8_decode($data['Cliente']['direccion'])."\n");
	}

	if ($data['Cliente']['telefono']!='0') {
		$printer -> text("TELEFONO: ".$data['Cliente']['telefono']."\n");
	}

	if ($data['Cliente']['referencia']!='') {
		$printer -> text("REFERENCIA: ".utf8_decode($data['Cliente']['referencia'])."\n");
	}

	$printer -> selectPrintMode();
	$printer -> setJustification(Printer::JUSTIFY_LEFT);
	$printer -> text("------------------------------------------------\n");
	$printer -> text("PRODUCTO                    CANT   P.U   IMPORTE\n");
	$printer -> text("------------------------------------------------\n");
	
	$total = 0;
	foreach($data['Detalle'] as $d){
		if($d['cantidad'] > 0){

			// $printer -> text(utf8_decode($d['nombre_producto'])."  ".$d['cantidad']."   ".utf8_decode($d['precio_unitario'])."   ".number_format(($d['cantidad'] * $d['precio_unitario']),2)."\n");
			// $total = ($d['cantidad'] * $d['precio_unitario']) + $total;

	$limite = 26;
	$listItems = '';

	if($data['consumo']==1){
		$descripcionprod = utf8_decode($data['consumo_desc']);
	}else{
		$descripcionprod = utf8_decode($d['nombre_producto']);
	}

	$division = round(strlen($descripcionprod)/$limite, 0, PHP_ROUND_HALF_UP);
	if ($division<1) {
		$division=1;
	}
	// echo	$division;
	// echo "---11111---";
	$cont = -$limite;
	for ($i = 0; $i < $division; $i++) {
		$cont = $cont+$limite;
		$contar = ($limite)-(strlen($descripcionprod)+2);
		$espacios='';
		for ($f = 0; $f < $contar; $f++) {
			$espacios .= ' ';
		}

		if($i===0){
		$listItems .= "".substr($descripcionprod,$cont, $limite)." ".$espacios." ".$d['cantidad']."   ".number_format(($d['precio_unitario']),2)."  ".number_format(($d['cantidad'] * $d['precio_unitario']),2)."\n";
				$printer -> text("".$listItems."");
		}else{
		$listItems = "".substr($descripcionprod,$cont, $limite)."\n";
				$printer -> text($listItems);
		}

	}

	$listItems = '';

			// $printer -> text("  ".$d['cantidad'].' '.utf8_decode($d['Producto']['pro_pre']).' | '.number_format(($d['precio_unitario']),2).'  '.number_format(($d['cantidad'] * $d['precio_unitario']),2)."\n");
			
			$total = ($d['cantidad'] * $d['precio_unitario']) + $total;
		}
	}
	
	$printer -> text("-----------------------------------------------\n");
	$printer -> selectPrintMode();
	$printer -> setJustification(Printer::JUSTIFY_LEFT);
	

$mystring = $data['igv'];
// $mystring = "0.18";
$findme   = '10';
$pos = strpos($mystring, $findme);

if ($pos !== false) {
    $igv_= "0.10";
} else {
	$igv_= "0.18";
}

// return;

    $igv_int = number_format((1+$igv_),2);
// echo $data['igv'];
// return;

    if ($data['desc_monto']>0) {
        $operacion_gravada = ($data['total'] + $data['comis_del'] - $data['desc_monto']) / $igv_int;
    }else{
        $operacion_gravada = ($data['total'] + $data['comis_del']) / $igv_int;
    }

	// $operacion_gravada = (($data['total'] + $data['comis_tar'] + $data['comis_del'] - $data['desc_monto']) / $igv_int);

	$igv = ($operacion_gravada * $igv_);

	$printer -> text("SUB TOTAL:                            S/ ".number_format(($data['total']),2)."\n");
	if($data['id_tped'] == 3){
	$printer -> text("COSTO DELIVERY:                       S/ ".number_format(($data['comis_del']),2)."\n");
	}

	if ($data['desc_monto']!=0) {
		$printer -> text("DESCUENTO:                            S/ ".number_format(($data['desc_monto']),2)."\n");
	}

	$printer -> text("OP.GRAVADA:                           S/ ".number_format(($operacion_gravada),2)."\n");
	$printer -> text("IGV:                                  S/ ".number_format(($igv),2)."\n");


	$printer -> text("IMPORTE A PAGAR:                      S/ ".number_format(($data['total'] + $data['comis_del'] - $data['desc_monto']),2)."\n");
	$printer -> text("\n");
	$printer -> selectPrintMode();
	$printer -> setJustification(Printer::JUSTIFY_LEFT);

	$total_letras = $data['total'] + $data['comis_del'] - $data['desc_monto'];
	$printer -> text("SON: ".numtoletras(number_format(($total_letras),2))."\n");
	// $printer -> text("SON: ".numtoletras($data['total'] + $data['comis_del'] - $data['desc_monto'])."\n");
	$printer -> selectPrintMode();
	$printer -> setJustification(Printer::JUSTIFY_CENTER);
	$printer -> text("------------ FORMA DE PAGO ------------ \n");
	$printer -> selectPrintMode();
	$printer -> setJustification(Printer::JUSTIFY_LEFT);

	switch($data['id_tpag']) {
		case 1:
			if ($data['pago_efe'] > 0) {
				$printer -> text("PAGO CON ".$data['desc_tp'].": S/".number_format($data['pago_efe_none'],2)."\n");
			}
			break;
		case 2:	
			$printer -> text("PAGO CON ".$data['desc_tp'].": S/".number_format($data['pago_visa'],2)."\n");
			$printer -> text("Cod. operacion: ".$data['codigo_operacion']."\n");
			break;
		case 3:				
			if ($data['pago_efe'] > 0) {
				$printer -> text("PAGO CON EFECTIVO: S/".number_format($data['pago_efe_none'],2)."\n");
			}
			if ($data['pago_visa'] > 0) {
				$printer -> text("PAGO CON VISA: S/".number_format($data['pago_visa'],2)."\n");
				$printer -> text("Cod. operacion: ".$data['codigo_operacion']."\n");
			}
			if ($data['pago_lin'] > 0) {
				$printer -> text("PAGO CON CULQI: S/".number_format($data['pago_lin'],2)."\n");
			}
			if ($data['pago_yape'] > 0) {
				$printer -> text("PAGO CON YAPE: S/".number_format($data['pago_yape'],2)."\n");
			}
			if ($data['pago_lukita'] > 0) {
				$printer -> text("PAGO CON LUKITA: S/".number_format($data['pago_lukita'],2)."\n");
			}
			if ($data['pago_tra'] > 0) {
				$printer -> text("PAGO CON TRANSFERENCIA: S/".number_format($data['pago_tra'],2)."\n");
			}
			if ($data['pago_plin'] > 0) {
				$printer -> text("PAGO CON PLIN: S/".number_format($data['pago_plin'],2)."\n");
			}
			if ($data['pago_mastercard'] > 0) {
				$printer -> text("PAGO CON MASTERCARD: S/".number_format($data['pago_mastercard'],2)."\n");
				$printer -> text("Cod. operacion: ".$data['codigo_operacion']."\n");
			}									
			if ($data['pago_tunki'] > 0) {
				$printer -> text("PAGO CON TUNKI: S/".number_format($data['pago_tunki'],2)."\n");
			}									
			break;	
		case 4:	
			$printer -> text("PAGO CON ".$data['desc_tp'].": S/".number_format($data['pago_lin'],2)."\n");
			break;	
		case 5:	
			$printer -> text("PAGO CON ".$data['desc_tp'].": S/".number_format($data['pago_yape'],2)."\n");
			break;								
		case 6:	
			$printer -> text("PAGO CON ".$data['desc_tp'].": S/".number_format($data['pago_lukita'],2)."\n");
			break;	
		case 7:	
			$printer -> text("PAGO CON ".$data['desc_tp'].": S/".number_format($data['pago_tra'],2)."\n");
			break;	
		case 8:	
			$printer -> text("PAGO CON ".$data['desc_tp'].": S/".number_format($data['pago_plin'],2)."\n");
			break;		
		case 9:	
			$printer -> text("PAGO CON ".$data['desc_tp'].": S/".number_format($data['pago_mastercard'],2)."\n");
			$printer -> text("Cod. operacion: ".$data['codigo_operacion']."\n");
			break;	
		case 10:	
			$printer -> text("PAGO CON ".$data['desc_tp'].": S/".number_format($data['pago_tunki'],2)."\n");
			break;													
	}

	if ($data['pago_efe'] > 0) {
		$vuelto = $data['pago_efe_none'] - $data['pago_efe'];
		$printer -> text("VUELTO: S/".number_format($vuelto,2)."\n");
	}	

	if ($data['desc_tipo'] == 1) {
		$printer -> text("CORTESIA: S/".number_format($data['total'],2)."\n");
	} else {
		if ($data['desc_tipo'] == 3) {
			$printer -> text("CREDITO PERSONAL: S/".number_format($data['desc_monto'],2)."\n");
		} 			
	}
	$printer -> text("CONDICIÓN DE PAGO: CONTADO \n");
	
if ($data['id_tdoc']=="1" || $data['id_tdoc']=="2") {
	//codigo qr //inicio
	$codesDir = "codes/";   

    if ($data['desc_td']=="BOLETA DE VENTA") {
    	$tipo_doc = '03';
    }else{
    	$tipo_doc = '01';
    }
    $total_qr = $data['total'] + $data['comis_del'] - $data['desc_monto'];

    if ($igv==null) {
    	$igv = 0;
    }
    $dataqr = "".$data['Empresa']['ruc']."|".$tipo_doc."|".$data['ser_doc']."|".$data['nro_doc']."|".number_format(($igv),2)."|".$total_qr."|".date('d-m-Y',strtotime($data['fec_ven']))."|".$data['Cliente']['tipo_cliente']."|".$data['Cliente']['dni']."".$data['Cliente']['ruc']."";

    $codeFile = $data['ser_doc'].'-'.$data['nro_doc'].'.png';

    QRcode::png($dataqr, $codesDir.$codeFile, "H", 4); 
	$qr = EscposImage::load("".$codesDir.$codeFile."", true);

  	$printer -> setJustification(Printer::JUSTIFY_CENTER);
	$printer -> bitImage($qr);
	// $printer -> feed();

	//codigo qr //final
	// $printer -> text("\n");
	// $printer -> selectPrintMode();
	$printer -> setJustification(Printer::JUSTIFY_CENTER);
	$printer -> text("Autorizado mediante Resolucion\n");
	$printer -> text("Nro. 034-005-0005655/SUNAT\n");
	$printer -> text("Consulta CPE en:\n");
	$printer -> text("cliente.alpharest.pe/facturacion/consulta\n");
	$printer -> text("\n");
	$printer -> text("Emitido por: alpharest.pe\n");
	$printer -> text("!GRACIAS POR SU PREFERENCIA¡\n");
	$printer -> text("===============================================\n");
	$printer -> text("\n");
}
	$printer -> cut();

}

	$printer->pulse();

	$printer -> close();

} catch(Exception $e) {
	echo "No se pudo imprimir en esta impresora " . $e -> getMessage() . "\n";
}
?>
echo "<script lenguaje="JavaScript">window.close();</script>";