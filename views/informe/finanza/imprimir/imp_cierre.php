<?php
require_once ('public/lib/print/num_letras.php');
require_once ('public/lib/pdf/cellfit.php');

class FPDF_CellFiti extends FPDF_CellFit
{
	function AutoPrint($dialog=false)
	{
		//Open the print dialog or start printing immediately on the standard printer
		$param=($dialog ? 'true' : 'false');
		$script="print($param);";
		$this->IncludeJS($script);
	}

	function AutoPrintToPrinter($server, $printer, $dialog=false)
	{
		//Print on a shared printer (requires at least Acrobat 6)
		$script = "var pp = getPrintParams();";
		if($dialog)
			$script .= "pp.interactive = pp.constants.interactionLevel.full;";
		else
			$script .= "pp.interactive = pp.constants.interactionLevel.automatic;";
		$script .= "pp.printerName = '\\\\\\\\".$server."\\\\".$printer."';";
		$script .= "print(pp);";
		$this->IncludeJS($script);
	}
}

define('EURO',chr(128));
$pdf = new FPDF_CellFiti('P','mm',array(80,800));
$pdf->AddPage();
$pdf->SetMargins(0,0,0,0);

// DATOS ARQUEO DE CAJA
if($this->dato->estado == 'a'){$estado = 'ABIERTO';}else{$estado = 'CERRADO';}
$pdf->Ln(3);
$pdf->SetFont('Courier','B',10);
$pdf->Cell(72,4,'ARQUEO DE CAJA',0,1,'C');
$pdf->Cell(72,4,'CORTE DE TURNO #COD0'.$this->dato->id_apc,0,1,'C'); 
$pdf->SetFont('Courier','',8); 
$pdf->Cell(72,4,'ESTADO: '.$estado,0,1,'C');       

$pdf->Ln(3);
$pdf->SetFont('Courier','',9);
$pdf->Cell(15, 4, 'CAJERO:', 0);    
$pdf->Cell(20, 4, '', 0);
$pdf->Cell(37, 4, utf8_decode($this->dato->desc_per),0,1,'R');
$pdf->Cell(15, 4, 'CAJA:', 0);    
$pdf->Cell(20, 4, '', 0);
$pdf->Cell(37, 4, utf8_decode($this->dato->desc_caja),0,1,'R');
$pdf->Cell(15, 4, 'TURNO:', 0);    
$pdf->Cell(20, 4, '', 0);
$pdf->Cell(37, 4, utf8_decode($this->dato->desc_turno),0,1,'R');
if($this->dato->estado == 'a'){$fecha_cierre = '';}else{$fecha_cierre = date('d-m-Y h:i A',strtotime($this->dato->fecha_cierre));}
$pdf->Cell(15, 4, 'FECHA APERTURA:', 0);    
$pdf->Cell(20, 4, '', 0);
$pdf->Cell(37, 4, date('d-m-Y h:i A',strtotime($this->dato->fecha_aper)),0,1,'R');
$pdf->Cell(15, 4, 'FECHA CIERRE:', 0);    
$pdf->Cell(20, 4, '', 0);
$pdf->Cell(37, 4, $fecha_cierre,0,1,'R');
$pdf->Ln(3);

//DINERO EN CAJA
$pdf->SetFont('Courier','B',10);
$pdf->Cell(72,4,'== DINERO EN CAJA ==',0,1,'C');
$pdf->Ln(4);
$pdf->SetFont('Courier','',9);
$pdf->Cell(37, 4, 'APERTURA DE CAJA:', 0);    
$pdf->Cell(20, 4, '', 0);
$pdf->Cell(15, 4, number_format(($this->dato->monto_aper),2),0,0,'R');
$pdf->Ln(4);
$pdf->Cell(37, 4, 'VENTAS EN EFECTIVO:', 0);    
$pdf->Cell(20, 4, '', 0);
$pdf->Cell(15, 4, '+ '.number_format(($this->dato->Principal->pago_efe),2),0,0,'R');
$pdf->Ln(4);
$pdf->Cell(37, 4, 'ENTRADAS EN EFECTIVO:', 0);    
$pdf->Cell(20, 4, '', 0);
$pdf->Cell(15, 4, '+ '.number_format(($this->dato->Ingresos->total),2),0,0,'R');
$pdf->Ln(4);
$pdf->Cell(37, 4, 'SALIDAS EN EFECTIVO:', 0);    
$pdf->Cell(20, 4, '', 0);
$pdf->Cell(15, 4, '- '.number_format(($this->dato->Egresos->total),2),0,0,'R');
$pdf->Ln(5);
$pdf->Cell(72,0,'','T');
$pdf->Ln(1);
$pdf->Cell(37, 4, 'EFECTIVO EN CAJA:', 0);    
$pdf->Cell(20, 4, '', 0);
$efectivoencaja = $this->dato->monto_aper + $this->dato->Principal->pago_efe + $this->dato->Ingresos->total - $this->dato->Egresos->total;
$pdf->Cell(15, 4, '= '.number_format(($efectivoencaja),2),0,0,'R');
$pdf->Ln(4);
$pdf->Cell(37, 4, 'EFECTIVO EN CIERRE:', 0);    
$pdf->Cell(20, 4, '', 0);
$pdf->Cell(15, 4, ''.number_format(($this->dato->monto_cierre),2),0,0,'R');
$pdf->Ln(5);
$pdf->Cell(72,0,'','T');
$pdf->Ln(1);
$pdf->Cell(37, 4, '', 0);    
$pdf->Cell(20, 4, '', 0);
$efectivodiferencia = $efectivoencaja - $this->dato->monto_cierre;
$nombre_efectivodiferencia = ($efectivodiferencia > 0) ? 'Faltante' : 'Restante';
$pdf->Cell(15, 4, $nombre_efectivodiferencia.' = '.number_format(($efectivodiferencia),2),0,0,'R');

//ENTRADAS
$pdf->Ln(8);
$pdf->SetFont('Courier','B',10);
$pdf->Cell(72,4,'== ENTRADAS EFECTIVO ==',0,1,'C');
$pdf->Ln(4);
$pdf->SetFont('Courier','',9);
$pdf->Cell(37, 4, 'ENTRADA DE DINERO', 0);    
$pdf->Cell(20, 4, '', 0);
$pdf->Cell(15, 4, number_format(($this->dato->Ingresos->total),2),0,0,'R');
$pdf->Ln(4);
$pdf->Cell(72,0,'','T');
$pdf->Ln(1);
$pdf->Cell(37, 4, 'TOTAL ENTRADAS', 0);    
$pdf->Cell(20, 4, '', 0);
$pdf->Cell(15, 4, '= '.number_format(($this->dato->Ingresos->total),2),0,0,'R');

//SALIDAS
$pdf->Ln(8);
$pdf->SetFont('Courier','B',10);
$pdf->Cell(72,4,'== SALIDAS EFECTIVO ==',0,1,'C');
$pdf->Ln(4);
$pdf->SetFont('Courier','',9);
$pdf->Cell(37, 4, 'COMPRAS', 0);   
$pdf->Cell(20, 4, '', 0);
$pdf->Cell(15, 4, number_format(($this->dato->EgresosA->total),2),0,0,'R');
$pdf->Ln(4);
$pdf->Cell(37, 4, 'SERVICIOS', 0);   
$pdf->Cell(20, 4, '', 0);
$pdf->Cell(15, 4, number_format(($this->dato->EgresosB->total),2),0,0,'R');
$pdf->Ln(4);
$pdf->Cell(37, 4, 'REMUNERACIONES', 0);   
$pdf->Cell(20, 4, '', 0);
$pdf->Cell(15, 4, number_format(($this->dato->EgresosC->total),2),0,0,'R');
$pdf->Ln(4);
$pdf->Cell(37, 4, 'PAGOS A PROVEEDORES', 0);   
$pdf->Cell(20, 4, '', 0);
$pdf->Cell(15, 4, number_format(($this->dato->EgresosD->total),2),0,0,'R');
$pdf->Ln(4);
$pdf->Cell(37, 4, 'PAGOS A DELIVERY', 0);   
$pdf->Cell(20, 4, '', 0);
$pdf->Cell(15, 4, number_format(($this->dato->EgresosE->total),2),0,0,'R');
$pdf->Ln(4);
$pdf->Cell(72,0,'','T');
$pdf->Ln(1);
$pdf->Cell(37, 4, 'TOTAL SALIDAS', 0);    
$pdf->Cell(20, 4, '', 0);
$pdf->Cell(15, 4, '= '.number_format(($this->dato->Egresos->total),2),0,0,'R');

//VENTAS
$pdf->Ln(8);
$pdf->SetFont('Courier','B',10);
$pdf->Cell(72,4,'== VENTAS ==',0,1,'C');
$pdf->Ln(4);
$pdf->SetFont('Courier','',9);

$pdf->Cell(32, 4, '', 0);
$pdf->Cell(15, 4, 'OPER.',0,0,'R');
$pdf->Cell(25, 4, 'TOTAL',0,0,'R');
$pdf->Ln(4);

$pdf->Cell(32, 4, 'EFECTIVO', 0);   
$pdf->Cell(15, 4, $this->dato->Ventas_Efectivo[0]->cantidad,0,0,'R');
$pdf->Cell(25, 4, number_format(($this->dato->Principal->pago_efe),2),0,0,'R');
$pdf->Ln(4);

$pdf->Cell(32, 4, 'VISA', 0);   
$pdf->Cell(15, 4, $this->dato->Ventas_VISA[0]->cantidad,0,0,'R');
$pdf->Cell(25, 4, number_format(($this->dato->Ventas_VISA[0]->monto),2),0,0,'R');
$pdf->Ln(4);

$pdf->Cell(32, 4, 'MASTERCARD', 0);   
$pdf->Cell(15, 4, $this->dato->Ventas_Mastercard[0]->cantidad,0,0,'R');
$pdf->Cell(25, 4, number_format(($this->dato->Ventas_Mastercard[0]->monto),2),0,0,'R');
$pdf->Ln(4);

//$pdf->Cell(32, 4, 'CULQI', 0);   
//$pdf->Cell(15, 4, $this->dato->Ventas_CULQI[0]->cantidad,0,0,'R');
//$pdf->Cell(25, 4, number_format(($this->dato->Ventas_CULQI[0]->monto),2),0,0,'R');
//$pdf->Ln(4);

$pdf->Cell(32, 4, 'YAPE', 0);   
$pdf->Cell(15, 4, $this->dato->Ventas_YAPE[0]->cantidad,0,0,'R');
$pdf->Cell(25, 4, number_format(($this->dato->Ventas_YAPE[0]->monto),2),0,0,'R');
$pdf->Ln(4);

$pdf->Cell(32, 4, 'PLIN', 0);   
$pdf->Cell(15, 4, $this->dato->Ventas_PLIN[0]->cantidad,0,0,'R');
$pdf->Cell(25, 4, number_format(($this->dato->Ventas_PLIN[0]->monto),2),0,0,'R');
$pdf->Ln(4);

$pdf->Cell(32, 4, 'TRANSFERENCIA', 0);   
$pdf->Cell(15, 4, $this->dato->Ventas_Transferencia[0]->cantidad,0,0,'R');
$pdf->Cell(25, 4, number_format(($this->dato->Ventas_Transferencia[0]->monto),2),0,0,'R');
$pdf->Ln(4);

//$pdf->Cell(32, 4, 'LUKITA', 0);   
//$pdf->Cell(15, 4, $this->dato->Ventas_LUKITA[0]->cantidad,0,0,'R');
//$pdf->Cell(25, 4, number_format(($this->dato->Ventas_LUKITA[0]->monto),2),0,0,'R');
//$pdf->Ln(4);


//$pdf->Cell(32, 4, 'TUNKI', 0);   
//$pdf->Cell(15, 4, $this->dato->Ventas_TUNKI[0]->cantidad,0,0,'R');
//$pdf->Cell(25, 4, number_format(($this->dato->Ventas_TUNKI[0]->monto),2),0,0,'R');
//$pdf->Ln(4);

$totalDescuentos = $this->dato->Cortesia->total + $this->dato->Descuento->total + $this->dato->CreditoPersonal->total;
$cantidadDescuentos = $this->dato->Cortesia->cant + $this->dato->Descuento->cant + $this->dato->CreditoPersonal->cant;

$pdf->Cell(72,0,'','T');
$pdf->Ln(1);
//$pdf->Cell(32, 4, 'SUB TOTAL', 0);

$totalCantVentas = $this->dato->Ventas_Efectivo[0]->cantidad + $this->dato->Ventas_VISA[0]->cantidad + $this->dato->Ventas_Mastercard[0]->cantidad + $this->dato->Ventas_CULQI[0]->cantidad + $this->dato->Ventas_YAPE[0]->cantidad + $this->dato->Ventas_LUKITA[0]->cantidad + $this->dato->Ventas_Transferencia[0]->cantidad + $this->dato->Ventas_PLIN[0]->cantidad + $this->dato->Ventas_TUNKI[0]->cantidad;
//$pdf->Cell(15, 4, $totalCantVentas,0,0,'R');
$totalValorVentas = $this->dato->Principal->pago_efe + $this->dato->Ventas_VISA[0]->monto + $this->dato->Ventas_Mastercard[0]->monto + $this->dato->Ventas_CULQI[0]->monto + $this->dato->Ventas_YAPE[0]->monto + $this->dato->Ventas_LUKITA[0]->monto + $this->dato->Ventas_Transferencia[0]->monto + $this->dato->Ventas_PLIN[0]->monto + $this->dato->Ventas_TUNKI[0]->monto;
//$totalValorVentas = $this->dato->Principal->gran_total;
//$pdf->Cell(25, 4, '= '.number_format(($totalValorVentas),2),0,0,'R');
$pdf->SetFont('Courier','B',9);
$pdf->Cell(32, 4, 'TOTAL VENTAS', 0);    
$pdf->Cell(15, 4, $totalCantVentas,0,0,'R');
$pdf->Cell(25, 4, '= '.number_format(($totalValorVentas),2),0,0,'R');

//OTRAS OPERACIONES
$pdf->Ln(8);
$pdf->SetFont('Courier','B',10);
$pdf->Cell(72,4,'== OTRAS OPERACIONES ==',0,1,'C');
$pdf->Ln(4);
$pdf->SetFont('Courier','',9);
$pdf->Cell(32, 4, '', 0);
$pdf->Cell(15, 4, 'OPER.',0,0,'R');
$pdf->Cell(25, 4, 'TOTAL',0,0,'R');
$pdf->Ln(4); 
$pdf->Cell(32, 4, 'ANULACIONES VENTAS', 0);
$pdf->Cell(15, 4, $this->dato->Anulaciones->cant,0,0,'R');
$pdf->Cell(25, 4, number_format(($this->dato->Anulaciones->total),2),0,0,'R');
$pdf->Ln(4); 
$pdf->Cell(32, 4, 'DESCUENTOS', 0);
$pdf->Cell(15, 4, $this->dato->Descuento->cant,0,0,'R');
$pdf->Cell(25, 4, number_format(($this->dato->Descuento->total),2),0,0,'R');
$pdf->Ln(4); 
$pdf->Cell(32, 4, 'CORTESIAS', 0);
$pdf->Cell(15, 4, $this->dato->Cortesia->cant,0,0,'R');
$pdf->Cell(25, 4, number_format(($this->dato->Cortesia->total),2),0,0,'R');
$pdf->Ln(4); 
$pdf->Cell(32, 4, 'CREDIT. PERSONAL', 0);
$pdf->Cell(15, 4, $this->dato->CreditoPersonal->cant,0,0,'R');
$pdf->Cell(25, 4, number_format(($this->dato->CreditoPersonal->total),2),0,0,'R');
$pdf->Ln(4); 
$pdf->Cell(32, 4, 'CON GLOVO', 0);   
$pdf->Cell(15, 4, $this->dato->Glovo->cant,0,0,'R');
$pdf->Cell(25, 4, number_format(($this->dato->Glovo->total),2),0,0,'R');
$pdf->Ln(4);
$pdf->Cell(32, 4, 'CON RAPPI', 0);    
$pdf->Cell(15, 4, $this->dato->Rappi->cant,0,0,'R');
$pdf->Cell(25, 4, number_format(($this->dato->Rappi->total),2),0,0,'R');
$pdf->Ln(4);
$pdf->Cell(32, 4, 'CON PEDIDOSYA', 0);    
$pdf->Cell(15, 4, $this->dato->PedidosYa->cant,0,0,'R');
$pdf->Cell(25, 4, number_format(($this->dato->PedidosYa->total),2),0,0,'R');
$pdf->Ln(4);
$pdf->Cell(32, 4, 'COMISION DELIVERY', 0);
$pdf->Cell(15, 4, $this->dato->ComisionDelivery->cant,0,0,'R');
$pdf->Cell(25, 4, number_format(($this->dato->Principal->comis_del),2),0,0,'R');

if(Session::get('opc_02') == 1) {
$pollos_vendidos = 0;
foreach($this->dato->PollosVendidos as $d){
	$pollos_vendidos += $d->cantidad * $d->cant;
}
$pdf->Ln(4); 
$pdf->Cell(32, 4, 'POLLOS VENDIDOS', 0);
$pdf->Cell(15, 4, $pollos_vendidos,0,0,'R');
$pdf->Cell(25, 4, '',0,0,'R');
$pdf->Ln(4); 
$pdf->Cell(32, 4, 'POLLOS STOCK', 0);
$pdf->Cell(15, 4, $this->dato->stock_pollo,0,0,'R');
$pdf->Cell(25, 4, '',0,0,'R');
}
$pdf->Ln(6); 
$pdf->Cell(72,4,'DATOS DE IMPRESION',0,1,'');
$pdf->Cell(72,4,'USUARIO: '.Session::get('nombres').' '.Session::get('apellidos'),0,1,'');
date_default_timezone_set($_SESSION["zona_horaria"]);
setlocale(LC_ALL,"es_ES@euro","es_ES","esp");
$pdf->Cell(72,4,'FECHA: '.date("d-m-Y h:i A"),0,1,'');
$pdf->Ln(8);
$pdf->Cell(72,4,'___________________________________',0,1,'C');
$pdf->Cell(72,4,utf8_decode($this->dato->desc_per),0,1,'C');
// PIE DE PAGINA
$pdf->Ln(10);
$pdf->Output('ticket.pdf','i');
?>