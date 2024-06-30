<?php
date_default_timezone_set($_SESSION["zona_horaria"]);
setlocale(LC_ALL,"es_ES@euro","es_ES","esp");
$fecha = date("Y-m-d");
$hora = date("H:i:s");
//$_SESSION["item_detallado"] = '0';
//Session::set('item_detallado', $('#codigo_').val());modal-body p-t-0 p-b-0
$ubicacion = $_SERVER["REQUEST_URI"];
$es_orden = strpos($ubicacion, '/venta/orden');
?>

<style>
div.scrollmenu {
  background-color: #555;
  overflow: auto;
  white-space: nowrap;
}

div.scrollmenu a {
  display: inline-block;
  color: white;
  text-align: center;
  padding: 14px;
  text-decoration: none;
}

div.scrollmenu a:hover {
  background-color: #777;
}

<?php if (strlen($key_8) == 0) { ?>
<?php } else { ?>
.btn-precuenta {
    display: none;
}
<?php } ?>
</style>
<input type="hidden" id="esventa" value="<?=$es_orden?>"/>
<input type="hidden" id="url" value="<?php echo URL; ?>"/>
<input type="hidden" id="apcid" value="<?php echo Session::get('apcid'); ?>"/>
<input type="hidden" id="pc_ip" value="<?php echo Session::get('pc_ip'); ?>"/>
<input type="hidden" id="print_com" value="<?php echo Session::get('print_com'); ?>"/>
<input type="hidden" id="print_pre" value="<?php echo Session::get('print_pre'); ?>">
<input type="hidden" id="print_cpe" value="<?php echo Session::get('print_cpe'); ?>">
<input type="hidden" id="pc_name" value="<?php echo Session::get('pc_name'); ?>"/>
<input type="hidden" id="moneda" value="<?php echo Session::get('moneda'); ?>"/>
<input type="hidden" id="codped" value="<?php echo Session::get('codped'); ?>"/>
<input type="hidden" id="codtipoped" value="<?php echo Session::get('codtipoped'); ?>"/>
<input type="hidden" id="codtipopedentrega" value="0"/>
<input type="hidden" id="codrepartidor" value="1"/>
<input type="hidden" id="rol_usr" value="<?php echo Session::get('rol'); ?>"/>
<input type="hidden" id="tribAcr" value="<?php echo Session::get('tribAcr'); ?>"/>
<input type="hidden" id="diAcr" value="<?php echo Session::get('diAcr'); ?>"/>
<input type="hidden" id="codcomision" value="0"/>
<input type="hidden" name="codpagina" id="codpagina" value="2"/>
<input type="hidden" id="codimpcomandamesa" value="<?php echo Session::get('opc_03'); ?>"/>
<input type="hidden" id="codigo_" value="0"/>
<input type="hidden" id="mesaje_waz" value="Su comprobante de pago electrónico ha sido generado correctamente, puede revisarlo en el siguiente enlace:"/>
<!--<input type="hidden" id="host_pc" value="<?php echo gethostname(); ?>"/>-->
<input type="hidden" id="print_com_combo" value="<?php echo Session::get('print_com_combo'); ?>"/>
<br>  
<div class="row">
    <div class="col-lg-8">
        <div class="row mb-3">
            <div class="col-auto col-md-5">
                <button class="btn btn-danger" onclick="listarProdsMasVend();">
                    <i class="fi fi-rr-heart"></i>
                    <span class="d-none d-sm-inline-block">Favoritos</span>
                </button>
                <button class="btn btn-primary hidden-xs-down" onclick="listarCategorias();">
                    <i class="fi fi-rr-apps"></i>
                    <span class="d-none d-sm-inline-block">Categorias</span>
                </button>
            </div>
            <div class="col col-md-7">
                <input type="text" class="form-control" name="buscar_producto" id="buscar_producto" placeholder="Buscar productos..." autocomplete="off">
            </div>
        </div>
        <div class="row">
            <div class="col-12 p-0">
                <div class="tab-content w-100" style="padding:5px">
                    <div class="col-12 p-0 scroll_productos">
                        <ul class="grid-prod" id="list-productos" data-toggle="buttons"></ul>
                    </div>
                </div>
            </div>
        </div>
        <div id="card2"></div>
    </div>
    <div class="col-lg-4 orden_lista">
        <div class="card m-b-0">
            <div class="card-body p-b-0">
                <div class="d-flex flex-wrap0">
                    <div>
                        <h4 class="card-title">
                            <span class="pedido-numero-icono"></span>
                            <span class="pedido-numero font-medium text-warning"></span>
                        </h4>
                        <h5>
                            <i class="pedido-cliente-icono"></i> 
                            <span class="pedido-cliente font-medium text-success"></span>
                        </h5>
                    </div>
                    <div class="ml-auto align-self-center bc" style="display: none;">
                        <input type="hidden" name="codped" id="codped" value="<?php echo Session::get('codped'); ?>"/>
                        <button class="btn btn-primary" id="btn-confirmar"><i class="fas fa-print"></i>ENVIAR</button>
                    </div>
                    <div class="ml-auto align-self-center btn-imp"></div>
                </div>
                <input type="hidden" id="nombre_salon" value="" />
                <input type="hidden" id="nombre_mozo" value="" />
            </div>
            <div><hr class="mb-0"></div>
            <div class="scroll_orden">
                <div id="nvo-ped" style="display: none;">
                    <table class="table table-hover" style="margin-bottom: -20px !important; margin-top: 0px !important;" id="nvo-ped-det"></table>
                    <div><hr class="m-b-0"></div>
                </div>
                <div class="comment-widgets m-b-0" id="list-detped" style="height: 80%;"></div>
            </div>            
            <div class="card-body p-3">
                <div class="row botones-pagos" style="margin-left: 0; margin-right: 0;">
                    <?php if(Session::get('rol') <> 5) { ?>
                        <div class="col-5 btn-dividir-pos opc1" style="display: none" onclick="facturar(<?php echo Session::get('codped'); ?>,2);">
                            <div class="d-flex justify-center">
                                <div class="display-6 text-white"><i class="fas fa-copy"></i></div>
                                <div class="m-l-10 align-self-center">
                                    <h6 class="text-white">DIVIDIR<br> CUENTA</h6>
                                </div>
                            </div>
                        </div>
                        <div class="col-7 btn-pagar-pos opc1" style="display: none" onclick="facturar(<?php echo Session::get('codped'); ?>,1);">
                            <div class="d-flex justify-center">
                                <div class="display-6 text-white"><i class="far fa-money-bill-alt"></i></div>
                                <div class="m-l-10 align-self-center">
                                    <h4 class="text-white m-b-0 font-bold" style="line-height: 10px;"><span id="totalPagar"></span></h4>
                                    <small class="text-white font-medium">COBRAR</small>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 btn-mozo-pos opc3" style="display: none">
                            <div class="d-flex justify-center">
                                <div class="display-6 text-white"><i class="far fa-money-bill-alt"></i></div>
                                <div class="m-l-10 align-self-center">
                                    <h3 class="text-white m-b-0 font-bold"><span class="totalPagar" id="totalPagar"></span></h3>
                                </div>
                            </div>
                        </div>
                    <?php } else { ?>
                        <div class="col-12 btn-mozo-pos opc1" style="display: none">
                            <div class="d-flex justify-center">
                                <div class="display-6 text-white"><i class="far fa-money-bill-alt"></i></div>
                                <div class="m-l-10 align-self-center">
                                    <h3 class="text-white m-b-0 font-bold"><span id="totalPagar"></span></h3>
                                </div>
                            </div>
                        </div>
                    <?php } ?>                   
                    <div class="col-12 btn-cancelar-pos opc2" style="display: none" onclick="anular_pedido(<?php echo Session::get('codped'); ?>);">
                        <div class="d-flex justify-center">
                            <div class="display-6 text-white"><i class="fas fa-times-circle"></i></div>
                            <div class="m-l-10 align-self-center">
                                <h6 class="text-white">CANCELAR PEDIDO</h6>
                            </div>
                        </div>
                    </div>            
                </div>
            </div>
        </div>
    </div>
    <div class="">
        <!-- <button class="right-side-toggle waves-effect waves-light btn-primary btn btn-circle btn-lg btn-categ pull-right m-l-10" style="bottom: 122px"><i class="fas fa-chevron-circle-left text-white"></i></button> -->
        <button class="waves-effect waves-light btn-custom btn-inverse btn btn-up hidden-lg-up" style="bottom: 65px"><i class="ti-arrow-circle-up text-white"></i></button>
        <button class="waves-effect waves-light btn-custom btn-inverse btn btn-down hidden-lg-up" style="bottom: 10px"><i class="ti-shopping-cart text-white"></i></button>
    </div>
    <!-- Right sidebar -->
    <!-- ============================================================== -->
    <!-- .right-sidebar -->
    <div class="right-sidebar">
        <div class="rpanel-title"> Categor&iacute;as <span><i class="ti-close right-side-toggle"></i></span> </div>
        <div class="r-panel-body p-0">
            <div class="scroll_categorias list-group font-13" id="list-catgrs-movil"></div>         
        </div>
    </div>
    <!-- ============================================================== -->
    <!-- End Right sidebar -->
    <!-- ============================================================== -->
</div>

<div style="padding: 0px !important;" class="modal fullscreen-modal" id="modal-facturar" tabindex="-1" data-backdrop="static" data-keyboard="false" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <form id="form-facturar" method="post" enctype="multipart/form-data" class="form-facturar">
        <input type="hidden" name="id_pedido" id="id_pedido">
        <input type="hidden" name="dividir_cuenta" id="dividir_cuenta">
        <input type="hidden" name="total_pedido" id="total_pedido">
        <input type="hidden" name="total_venta" id="total_venta">
            <div class="modal-header" style="background: #006a71;">
                <h4 class="modal-title text-white"><strong>DETALLE PEDIDO</strong></h4>
            </div>
            <div style="padding: 0px !important;" class="modal-body p-t-0 p-b-0">
                <div class="container-fluid p-l-0 p-r-0" style="background: #fbfdff;">
                    <div class="row p-l-0">
                        <!-- Column -->
                        <div class="col-md-5 p-l-0 p-r-0 b-l b-r" style="height: 60%;background: #fff;">
                            <table class="table table-hover m-b-0 lista-producto-facturar">
                                <thead class="text-white" style="background: #79a3b1;">
                                    <tr>
                                        <th width="20%">Cant.</th>
                                        <th width="60%">Producto</th>
                                        <th width="20%" class="text-right">Total</th>
                                    </tr>
                                </thead>
                            </table>
                            <div class="scroll_list_items_facturar lista-producto-facturar" style="overflow: hidden;width: auto;">
                                <table class="table stylish-table m-b-0" style="background: #fff;">
                                    <tbody id="list-items-facturar" class="tb-st"></tbody>
                                </table>
                            </div>
                            <table class="table table-hover mb-0 lista-venta-por-consumo" style="display: none;">
                                <thead class="text-white" style="background: #79a3b1;">
                                    <tr>
                                        <th width="100%">Descripci&oacute;n</th>
                                    </tr>
                                </thead>
                            </table>
                            <div class="scroll_list_items_facturar lista-venta-por-consumo" style="display: none;">
                                <table class="table stylish-table mb-0 " style="background: #fff;">
                                    <tbody class="tb-st">
                                        <tr class="comment-list">
                                            <td width="100%" ><input type="text" class="form-control" id="venta_por_consumo_concepto" value="POR CONSUMO"></td>
                                        </tr>
                                        
                                    </tbody>
                                </table>
                            </div> 
                            <hr class="m-t-0 m-b-0">
                            <table class="table table-condensed m-t-0 m-b-0" style="background: #fcf8ec; border-bottom-left-radius: .3rem;">
                                <thead>
                                    <tr class="text-muted font-13">
                                        <th class="p-b-5">Sub Total</th>
                                        <th class="text-right p-b-5">
                                            <span><?php echo Session::get('moneda'); ?>
                                            <span class="subtotal"></span>
                                            </span>
                                        </th>
                                    </tr>                                
                                    <tr class="text-muted font-13 display-descuento">
                                        <th class="p-b-5"><a href="javascript:void(0);" onclick="descuento_factura();" class="link">Cortes&iacute;a / Descuento <i class="ti-info-alt text-warning font-10" data-original-title="Puede generar una cortesia o ingresar un descuento por aquí" data-toggle="tooltip" data-placement="top"></i></a></th>
                                        <th class="text-right p-b-5">
                                            <input type="hidden" name="descuento_monto_hidden" id="descuento_monto_hidden" class="descuento" value="0.00">
                                            <input type="hidden" name="descuento_tipo_hidden" id="descuento_tipo_hidden" value="">
                                            <input type="hidden" name="descuento_motivo_hidden" id="descuento_motivo_hidden" value="">
                                            <input type="hidden" name="descuento_personal_hidden" id="descuento_personal_hidden" value="">
                                            <span><?php echo Session::get('moneda'); ?>
                                            <span class="descuento">0.00</span>
                                            </span>
                                        </th>
                                    </tr>
                                    <tr class="text-muted font-13 display-comision-delivery">
                                        <th class="p-b-5"><a href="javascript:void(0)" class="link" onclick="comision_delivery_factura();">Comision delivery <i class="ti-info-alt text-warning font-10" data-original-title="Puede ingresar un costo por el servicio de delivery por aquí" data-toggle="tooltip" data-placement="top"></i></a></th>
                                        <th class="text-right p-b-5">
                                            <input type="hidden" name="comision_delivery" id="comision_delivery" class="comision_delivery" value="0.00" autocomplete="off">
                                            <span><?php echo Session::get('moneda'); ?>
                                            <span class="comision_delivery">0.00</span>
                                            </span>
                                        </th>
                                    </tr>
                                    <tr class="text-muted font-13 display-comision-tarjeta">
                                        <th class="p-b-5">Comision tarjeta</th>
                                        <th class="text-right p-b-5">
                                            <input type="hidden" name="comision_tarjeta" id="comision_tarjeta" class="comision_tarjeta" value="0.00"/>
                                            <span><?php echo Session::get('moneda'); ?>
                                            <span class="comision_tarjeta">0.00</span>
                                            </span>
                                        </th>
                                    </tr>
                                    <tr class="font-bold font-16">
                                        <th>TOTAL</th>
                                        <th class="text-right">
                                            <input type="hidden" class="totalPedido"/>
                                            <span class="text-tipo-descuento"></span>
                                            <span><?php echo Session::get('moneda'); ?>
                                                <span class="totalPedido"></span>
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <!-- Column -->
                        <div class="col-md-7 order-1 order-md-2 p-t-20" style="background: #fbfdff;">
                            <div class="row mt-0">
                                <div class="col align-self-center">
                                    <h5>TIPO DE DOCUMENTO</h5> 
                                </div>
                                <div class="col"> 
                                        <div class="btn-group btn-group-toggle w-100" data-toggle="buttons"> 
                                        <?php foreach($this->TipoDocumento as $key): 
                                                if($key['defecto'] == '1'){
                                                    $tdoc_defecto = $key['id_tipo_doc'];
                                                }    
                                        ?>
                                                <label class="btn waves-effect waves-light btn-outline-primary btn-tipo-doc-<?php echo $key['id_tipo_doc']; ?>">
                                                    <input type="radio" name="tipo_doc" value="<?php echo $key['id_tipo_doc']; ?>" autocomplete="off"><?php echo ($key['id_tipo_doc'] == 1)? 'BOLETA': $key['descripcion']; ?>
                                                </label>
                                            <?php endforeach; ?>
                                            <!--
                                            <label class="btn waves-effect waves-light btn-outline-primary btn-tipo-doc-1 active"> 
                                            <input type="radio" name="tipo_doc" value="1" autocomplete="off" checked="checked">BOL </label> 
                                            <label class="btn waves-effect waves-light btn-outline-primary btn-tipo-doc-2"> 
                                            <input type="radio" name="tipo_doc" value="2" autocomplete="off">FAC </label> 
                                            <label class="btn waves-effect waves-light btn-outline-primary btn-tipo-doc-3"> 
                                            <input type="radio" name="tipo_doc" value="3" autocomplete="off">NV </label>
                                            --> 
                                    </div> 
                                </div>
                            </div>
                            <div class="col-lg-12 py-2" style="background: #fbfdff;">
                                <input type="hidden" name="cliente_id" id="cliente_id" value=""/>
                                <input type="hidden" name="cliente_tipo" id="cliente_tipo" value="1"/>
                                <label class="font-13 text-inverse">BUSCAR CLIENTE</label>
                                <div class="input-group">
                                    <div class="opcion-cliente input-group-prepend"></div>                                
                                    <input type="text" class="form-control" name="buscar_cliente" id="buscar_cliente" autocomplete="off">
                                    <a class="input-group-append" href="javascript:void(0)" id="btnClienteLimpiar"data-original-title="Limpiar datos" data-toggle="tooltip" data-placement="top">
                                        <span class="input-group-text bg-header">
                                            <small><i class="fas fa-times link-danger"></i></small>
                                        </span>
                                    </a>
                                </div>
                            </div>
                            
                            <div class="col-lg-12 p-t-10">
                                <hr style ="margin-top: 0px; margin-botton:0px;">
                                <div class="switch">
                                    <span class="mr-2 display_venta_por_consumo"> <input type="checkbox" name="venta_por_consumo" id="venta_por_consumo" class="material-inputs filled-in   chk-col-blue    venta_por_consumo"/> <label for="venta_por_consumo" class="m-0">Venta por consumo</label>
                                    </span>   
                                </div>
                                <hr style ="margin-botton:20px !important;">                             
                            </div>

                            <div class="col-12">
                                <div class="mensaje-pago" style="display: none;">
                                    <!-- <div class="alert alert-info m-b-0"><i class="fas fa-info-circle"></i><span class="mensaje-pago-text"> Esta venta ha sido pagada con CULQI</span></div> -->
                                </div> 
                                <div style="margin-bottom: 15px;" class="row">
                                    <div style="margin-top: 5px !important;" class="col-8"><h4>Formas de pago</h4></div>
                                    <div class="col-4 text-right">
                                        <select class="selectpicker" name="tipo_pago" id="tipo_pago" data-style="form-control btn-secondary" data-width="0%" data-size="5" data-live-search-style="begins" autocomplete="off">
                                        <?php foreach($this->TipoPago as $key => $value): ?>
                                        <option label="<?php echo $value['id_pago']; ?>" value="<?php echo $value['id_tipo_pago']; ?>"><?php echo $value['descripcion']; ?></option>
                                        <?php endforeach; ?>
                                        </select>
                                    </div> 
                                </div>
                                <div class="row">
                                    <div class="col-lg-4 p-5">
                                        <div class="input-group display-pago-efectivo box-tipo-pago">
                                            <div style="margin-right: 0px !important" class="input-group-prepend">
                                                <span class="input-group-text bg-white" style="display: grid; width: 102px;border: 1px solid #04E06B; border-radius: 20px; padding-top: 10px !important; padding-bottom: 10px !important;"> 
                                                <small class="text-left">PAGA CON</small> 
                                                <div class="text-left font-medium font-10">EFECTIVO</div>   
                                                </span>
                                            </div>
                                            <input type="text" class="form-control form-control-lg" maxlength="9" placeholder="......." autocomplete="off" name="pago_efe" id="pago_efe" data-fv-field="pago_efe" style="padding-top: 26px !important; padding-bottom: 26px !important; font-size: 18px !important; border: 1px solid #04E06B !important;
                                            border-left: 0px!important;">
                                        </div>
                                    </div>

                                    <div class="col-lg-4 p-5">
                                        <div class="input-group display-pago-default">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text bg-white" style="display: grid; width: 102px;border: 1px solid #04E06B; border-radius: 20px; padding-top: 10px !important; padding-bottom: 10px !important;"> 
                                                <small class="text-left">MONTO</small> 
                                                <div class="text-left font-medium font-10">TOTAL EFEC.</div>   
                                                </span>
                                            </div>
                                            <div style="padding-top: 11px !important; padding-bottom: 41px !important; font-size: 18px !important; border: 1px solid #04E06B !important;
                                            border-left: 0px!important; background-color: #f1f1f1a3 !important;" class="form-control form-control-lg"><span class="totalPedidoMenosTarjeta">0.00</span></div>
                                        </div>
                                    </div>

                                    <div class="col-lg-4 p-5">
                                        <div class="input-group display-pago-default">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text bg-white" style="display: grid; width: 102px;border: 1px solid #04E06B; border-radius: 20px; padding-top: 10px !important; padding-bottom: 10px !important;"> 
                                                <small class="text-left">VUELTO</small> 
                                                <div class="text-left font-medium font-10">APROX.</div>   
                                                </span>
                                            </div>
                                            <div style="padding-top: 11px !important; padding-bottom: 41px !important; font-size: 18px !important; border: 1px solid #04E06B !important;
                                            border-left: 0px!important; background-color: #f1f1f1a3 !important;" class="form-control form-control-lg"><span class="text-success" id="vuelto">0.00</span></div>
                                        </div>
                                    </div>
                                    <div style="display:none" class="col-lg-4 p-5">
                                        <div class="input-group display-pago-tarjeta box-tipo-pago">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text bg-white" style="display: grid; width: 102px;border: 1px solid #04E06B; border-radius: 20px; padding-top: 10px !important; padding-bottom: 10px !important;"> 
                                                <small class="text-left">PAGA CON</small> 
                                                <div class="text-left font-medium font-10">TARJETA</div>   
                                                </span>
                                            </div>
                                            <input type="text" class="form-control form-control-lg" maxlength="9" placeholder="0.00" autocomplete="off" name="pago_tar" id="pago_tar" value="0" readonly style="padding-top: 26px !important; padding-bottom: 26px !important; font-size: 18px !important; border: 1px solid #04E06B !important;
                                            border-left: 0px!important;">
                                        </div>
                                    </div>

                                    <div style="display:none" class="col-lg-4 p-5">
                                        <div class="input-group display-pago-billetera box-tipo-pago">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text bg-white" style="display: grid; width: 102px;border: 1px solid #04E06B; border-radius: 20px; padding-top: 10px !important; padding-bottom: 10px !important;"> 
                                                <small class="text-left">PAGA CON</small> 
                                                <div class="text-left font-medium font-10">BILLETERA DIGITAL</div>   
                                                </span>
                                            </div>
                                            <input type="text" class="form-control form-control-lg" maxlength="9" placeholder="0.00" autocomplete="off" name="pago_bil" id="pago_bil" value="0" readonly style="padding-top: 26px !important; padding-bottom: 26px !important; font-size: 18px !important; border: 1px solid #04E06B !important;
                                            border-left: 0px!important;">
                                        </div>
                                    </div>



                                    <div style="display:none"  class="col-lg-4 p-5">
                                        <div class="input-group display-pago-linea box-tipo-pago">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text bg-white" style="display: grid; width: 102px;border: 1px solid #04E06B; border-radius: 20px; padding-top: 10px !important; padding-bottom: 10px !important;"> 
                                                <small class="text-left">PAGA CON</small> 
                                                <div class="text-left font-medium font-10">EN LINEA</div>   
                                                </span>
                                            </div>
                                            <input type="text" class="form-control form-control-lg" maxlength="9" placeholder="0.00" autocomplete="off" name="pago_lin" id="pago_lin" value="0" style="padding-top: 26px !important; padding-bottom: 26px !important; font-size: 18px !important; border: 1px solid #04E06B !important;
                                            border-left: 0px!important;">
                                        </div>
                                    </div>

                                </div>                                
                            </div>
                            <div class="col-12 display-tipo-pago">
                                <div class="row">
                                    <?php
                                        $listaTipoPago = $this->TipoPago;
                                    ?>  
                                    <?php
                                    foreach ($listaTipoPago as $key => $value) {
                                        $id_pago = $value['id_pago'];
                                        
                                        if ($id_pago == 2) {
                                            $id_tipo_pago = $value['id_tipo_pago'];
                                            $descripcion = $value['descripcion'];
                                            echo '<div class="col-lg-4 p-5">
                                                <div class="input-group">
                                                    <div style="margin-right: 0px !important" class="input-group-prepend">
                                                        <span class="input-group-text bg-white" style="display: grid; width: 102px;border: 1px solid #04E06B; border-radius: 20px; padding-top: 10px !important; padding-bottom: 10px !important;"> 
                                                        <small class="text-left">PAGA CON</small>
                                                        <div class="text-left font-medium font-10">' . $descripcion . '</div>
                                                    </div> 
                                                    <input type="text" class="form-control form-control-lg pago_' . $id_pago .'" maxlength="9" placeholder="......." autocomplete="off" name="tarjetasMontos[]" value="0" data-tp="' . $id_tipo_pago . '" style="padding-top: 26px !important; padding-bottom: 26px !important; font-size: 18px !important; border: 1px solid #04E06B !important;
                                                    border-left: 0px!important;">
                                                </div> 
                                            </div>';
                                        }
                                        if ($id_pago == 7) {
                                            $id_tipo_pago = $value['id_tipo_pago'];
                                            $descripcion = $value['descripcion'];
                                            echo '<div class="col-lg-4 p-5">
                                                <div class="input-group">
                                                    <div style="margin-right: 0px !important" class="input-group-prepend">
                                                        <span class="input-group-text bg-white" style="display: grid; width: 102px;border: 1px solid #04E06B; border-radius: 20px; padding-top: 10px !important; padding-bottom: 10px !important;"> 
                                                        <small class="text-left">PAGA CON</small>
                                                        <div class="text-left font-medium font-10">' . $descripcion . '</div>
                                                    </div> 
                                                    <input type="text" class="form-control form-control-lg pago_' . $id_pago .'" maxlength="9" placeholder="......." autocomplete="off" name="billeterasMontos[]" value="0" data-tp="' . $id_tipo_pago . '" style="padding-top: 26px !important; padding-bottom: 26px !important; font-size: 18px !important; border: 1px solid #04E06B !important;
                                                    border-left: 0px!important;">
                                                </div> 
                                            </div>';
                                        }
                                    }
                                    ?>
                                    <div class="col-lg-4 p-5">
                                        <div class="input-group display-pago-transferencia box-tipo-pago">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text bg-white" style="display: grid; width: 102px;border: 1px solid #04E06B; border-radius: 20px; padding-top: 10px !important; padding-bottom: 10px !important;"> 
                                                <small class="text-left">PAGA CON</small> 
                                                <div class="text-left font-medium font-10">TRANSFERENCIA</div>   
                                                </span>
                                            </div>
                                            <input type="text" class="form-control form-control-lg" maxlength="9" placeholder="0.00" autocomplete="off" name="pago_tra" id="pago_tra" value="0" style="padding-top: 26px !important; padding-bottom: 26px !important; font-size: 18px !important; border: 1px solid #04E06B !important;
                                            border-left: 0px!important;">
                                        </div>
                                    </div>
                                </div>
                            </div>                            

                            <div class="row">
                                <div class="col-8 display-pago-rapido-efectivo">
                                    <div class="col-sm-12 text-left m-t-10 display-pago-rapido-efectivo">
                                        <label class="font-13 text-inverse">Pago Efectivo R&aacute;pido</label>
                                    </div>
                                    <div class="col-sm-12 text-left display-pago-rapido-efectivo">
                                        <span class="round round-primary opc-01 p-l-10 p-r-10" style="width: auto; border-radius: 10px; cursor: pointer;"></span>
                                        <span class="round p-l-10 p-r-10" style="width: auto; border-radius: 10px; cursor: pointer;" onclick="opcion_pago_efectivo(10);">10</span>
                                        <span class="round p-l-10 p-r-10" style="width: auto; border-radius: 10px; cursor: pointer;" onclick="opcion_pago_efectivo(20);">20</span>
                                        <span class="round p-l-10 p-r-10" style="width: auto; border-radius: 10px; cursor: pointer;" onclick="opcion_pago_efectivo(50);">50</span>
                                        <span class="round p-l-10 p-r-10" style="width: auto; border-radius: 10px; cursor: pointer;" onclick="opcion_pago_efectivo(100);">100</span>
                                        <span class="round p-l-10 p-r-10" style="width: auto; border-radius: 10px; cursor: pointer;" onclick="opcion_pago_efectivo(200);">200</span>
                                    </div>
                                </div>
                                <div class="col-6 display-codigo-operacion">
                                    <div class="col-lg-12 m-t-10">
                                        <label class="font-13 text-inverse">Ingrese su c&oacute;digo de voucher</label>
                                        <div class="form-group">                               
                                            <input type="text" class="form-control" name="codigo_operacion" id="codigo_operacion" autocomplete="off"/>
                                        </div>
                                    </div>
                                </div>
                            </div>   
                            <div class="col-lg-12 p-t-10 p-b-0">
                                <div class="mensaje-amortizacion animated shake" style="display: none;">
                                    <div class="alert alert-warning m-b-0"><i class="fas fa-info-circle"></i> <span class="mensaje-amortizacion-text"></span></div>
                                </div>
                            </div>                                                                                
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer bg-header">
                <button type="button" class="btn btn-secondary btn-cancel-facturar-1" data-dismiss="modal">Volver</button>
                <button type="button" class="btn btn-secondary btn-cancel-facturar-2" data-dismiss="modal">Volver</button>
                <button type="submit" class="btn btn-success" id="btn-submit-facturar">ACEPTAR</button>
            </div>
        </form>
        </div>
    </div>
</div>

<div class="modal inmodal" id="modal-cliente" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content animated bounceInTop">
            <form id="form-cliente" method="post" enctype="multipart/form-data">
            <input type="hidden" name="id_cliente" id="id_cliente">
            <input type="hidden" name="tipo_cliente" id="tipo_cliente">
            <div class="modal-header justify-center">
                <h4 class="modal-title-cliente">Nuevo Cliente</h4>
                <div class="ml-auto m-t-10">
                    <div class="selector_persona">
                        <input name="tipo_cli" type="radio" value="1" id="td_dni" class="with-gap radio-col-light-green"/>
                        <label for="td_dni"><?php echo Session::get('diAcr'); ?></label>
                        <input name="tipo_cli" type="radio" value="2" id="td_ruc" class="with-gap radio-col-light-green"/>
                        <label for="td_ruc"><?php echo Session::get('tribAcr'); ?></label>
                    </div>
                </div>
            </div>
            <div class="modal-body p-0 floating-labels">
                <div class="row" style="margin-left: 0px; margin-right: 0px;">
                    <!-- Column -->
                    <div class="col-lg-6 b-r">
                        <div class="row card-body p-0">
                            <div class="col-md-12 p-l-10 p-t-10 b-t b-b m-b-40 bg-light-info" style="display: flex;">
                                <h6 class="font-medium">Informaci&oacute;n personal</h6>
                            </div>                       
                            <div class="col-md-6 block01" style="display: block;">
                                <div class="form-group ent m-b-40">
                                    <input type="text" class="form-control dni" name="dni" id="dni" minlength="<?php echo Session::get('diCar'); ?>" maxlength="<?php echo Session::get('diCar'); ?>" value="" autocomplete="off" required="required"/>
                                    <span class="bar"></span>
                                    <label for="dni" class="c-dni"><?php echo Session::get('diAcr'); ?></label>
                                </div>
                            </div>
                            <div class="col-md-6 block02" style="display: none;">
                                <div class="form-group ent m-b-40">
                                    <input type="text" class="form-control ruc" name="ruc" id="ruc" minlength="<?php echo Session::get('tribCar'); ?>" maxlength="<?php echo Session::get('tribCar'); ?>" value="" autocomplete="off" required="required"/>
                                    <span class="bar"></span>
                                    <label for="ruc" class="c-ruc"><?php echo Session::get('tribAcr'); ?></label>
                                </div>
                            </div>                            
                            <div class="col-md-12 block07" style="display: none;">
                                <div class="form-group letNumMayMin m-b-40">
                                    <input type="text" class="form-control ruc input-mayus" name="razon_social" id="razon_social" value="" autocomplete="off" required="required"/>
                                    <span class="bar"></span>
                                    <label for="razon_social">Raz&oacute;n Social</label>
                                </div>
                            </div>
                            <div class="col-md-12 block03" style="display: block;">
                                <div class="form-group letMayMin m-b-40">
                                    <input type="text" class="form-control dni input-mayus" name="nombres" id="nombres" value="" autocomplete="off" required="required"/>
                                    <span class="bar"></span>
                                    <label for="nombres">Nombre completo</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Column -->
                    <div class="col-lg-6">
                        <div class="row card-body bg-header p-0">
                            <div class="col-md-12 p-l-10 p-t-10 b-t b-b m-b-40 bg-light-inverse" style="display: flex;">
                                <h6 class="font-medium">Contacto</h6>
                            </div> 
                            <div class="col-md-6 block05" style="display: block;">
                                <div class="form-group m-b-40">
                                    <input type="text" class="form-control bg-transparent dni input-mayus" name="fecha_nac" id="fecha_nac" value="" autocomplete="off" data-mask="99-99-9999"/>
                                    <span class="bar"></span>
                                    <label for="fecha_nac">Fecha de Nacimiento</label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group ent m-b-40">
                                    <input type="text" class="form-control bg-transparent" name="telefono" id="telefono" value="" autocomplete="off"/>
                                    <span class="bar"></span>
                                    <label for="telefono">Tel&eacute;fono</label>
                                </div>
                            </div>
                            <div class="col-md-12 block06" style="display: block;">
                                <div class="form-group m-b-40">
                                    <input type="text" class="form-control bg-transparent dni" name="correo" id="correo" value="" autocomplete="off"/>
                                    <span class="bar"></span>
                                    <label for="correo">Correo electr&oacute;nico</label>
                                </div>
                            </div>
                     
                            <?php if(0 == 1){ ?>
                                <div class="col-md-12 block08" style="display: none;">
                            <?php }else{ ?>
                                <div class="col-md-12">
                            <?php } ?>
                           
                                <div class="form-group m-b-40">
                                    <input type="text" class="form-control bg-transparent" name="direccion" id="direccion" value="" autocomplete="off" required="required"/>
                                    <span class="bar"></span>
                                    <label for="direccion">Direcci&oacute;n</label>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group m-b-40">
                                    <input type="text" class="form-control bg-transparent input-mayus" name="referencia" id="referencia" value="" autocomplete="off"/>
                                    <span class="bar"></span>
                                    <label for="referencia">Referencia</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Volver</button>
                <button type="submit" class="btn btn-success">Aceptar</button>
            </div>
            </form>
        </div>
    </div>
</div>

<div class="modal inmodal" id="modal-nota" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="true">
    <div class="modal-dialog">
        <div class="modal-content animated bounceInTop">
            <div class="modal-header justify-center">
                <h5 class="card-title-nota m-b-0"></h5>
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Cerrar</span></button>
            </div>
            <div class="modal-body floating-labels">
                <div class="nota-new m-t-20 m-b-20">
                    <h6 style="margin-bottom:10px;"class="card-subtitle">Agregue una coma ' , ' para agregar m&aacute;s de una nota</h6>
                    <input type="text" id="notas" data-role="tagsinput" class="input-mayus" placeholder="añadir">
                </div>
                <div class="nota-list animated fadeIn"><div class="demo-checkbox"></div></div>
                <input type="hidden" id="notapadre"/>
                <h6 class="card-subtitle notlist p-t-0"></h6>
                <input type="hidden" id="cod_add"/>
                <input type="hidden" id="cod_pres_add"/>
                <input type="hidden" id="cod_prod_add"/>
            </div>
            <div class="modal-footer">
                <div class="nota-new animated fadeIn">
                    <button type="button" class="btn btn-secondary btn-cancelar-nota">Cancelar</button>
                    <button type="button" class="btn btn-success btn-guardar-nota">Guardar</button>
                </div>
                <div class="nota-list animated fadeIn">
                    <button type="button" class="btn btn-success btn-acep-nota">Aceptar</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal inmodal" id="modal-stock-pollo" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="true">
    <div class="modal-dialog">
        <div class="modal-content animated bounceInTop">
            <div class="modal-header justify-center">
                <h5 class="m-b-0">Stock pollo</h5>
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Cerrar</span></button>
            </div>
            <div class="modal-body floating-labels p-0">
                <div class="row">
                    <div class="col-12">
                        <div class="social-widget">
                            <div class="table-responsive">
                                <table class="table stylish-table m-0">
                                    <thead class="table-head">
                                        <tr>
                                            <th>Producto</th>
                                            <th class="text-right">Cantidad</th>
                                        </tr>
                                    </thead>
                                    <tbody id="lista_productos"></tbody>
                                </table>
                            </div>
                            <div class="soc-header box-google" style="font-size: 20px;">Pollos vendidos</div>
                            <div class="soc-content">
                                <div class="col-6 b-r">
                                    <h3 class="font-medium pollos-vendidos"></h3>
                                    <h5 class="text-muted">Vendidos</h5></div>
                                <div class="col-6">
                                    <h3 class="font-medium pollos-stock"></h3>
                                    <h5 class="text-muted">Stock</h5></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Volver</button>
            </div>
        </div>
    </div>
</div>

<?php require_once('views/venta/compartido.php'); ?> 
<script>var tdoc_defecto = <?php echo $tdoc_defecto; ?>;</script>

<script id="nvo-ped-det-template" type="text/x-jsrender" src="">
                         <tbody class="tb-st"> {{for items}} <tr class="warning-element" style="border-left: 4px solid #ffb22b !important; background: #fefde3;"> <td> <div class="row pl-2"> <input type="hidden" name="id" value="{{:id}}"/> <input type="hidden" name="producto_id" value="{{:producto_id}}"/> <input type="hidden" name="area_id" value="{{:area_id}}"/> <input type="hidden" name="nombre_imp" value="{{:nombre_imp}}"/> <input type="hidden" name="categoria" value="{{:categoria}}"/> <input type="hidden" name="comentario" class="nota{{:id}}" value="{{:comentario}}" onchange="pedido.actualizar({{:id}}, this);"/> <input type="hidden" name="precio_original" value="{{:precio_original}}" /> <input type="hidden" name="toppings" value="{{:toppings}}"/> <input type="hidden" name="toppings_precio" class="topp_p{{:id}}" value="{{:toppings_precio}}" onchange="pedido.actualizar({{:id}}, this);"/> <input type="hidden" name="toppings_descripcion" class="topp_d{{:id}}" value="{{:toppings_descripcion}}" onchange="pedido.actualizar({{:id}}, this);"/> <div class="col-8 col-md-auto col-lg-7 px-1"> <span name="producto">{{:producto}}</span> <span name="presentacion" class="badge badge-warning text-white text-uppercase">{{:presentacion}}</span> <br> <span class="h6">{{:cantidad}} un</span> - <span class="h6">S/ {{:precio}}</span> | <span class="stock_producto_{{:id}}"></span><br> <span> {{if toppings_precio}} <ul class="nav flex-column"> {{for toppings_precio.split('=') ~descs=toppings_descripcion.split('=')}} <li> <span class="opcion">{{:~descs[#index]}}</span> x <span class="precio">S/ {{:}}</span> </li> {{/for}} </ul> {{/if}} </span> </div> <div class="col col-md-auto col-lg-5 px-1 align-self-start align-items-start text-center"> <div class="btn-group" role="group" aria-label="Basic example"> <button type="button" class="btn waves-effect waves-light btn-outline-info" onclick="preciolist({{:id}});"><i class="fas fa-edit"></i></button> <button type="button" class="btn waves-effect waves-light btn-outline-info" onclick="comentar({{:id}},{{:producto_id}},'{{:producto}}','{{:presentacion}}');"><i class="fas fa-comment-alt"></i></button> <button type="button" class="btn waves-effect waves-light btn-outline-danger" onclick="pedido.retirar({{:id}});"><i class="fas fa-trash"></i></button> </div> </div> </div> <div class="row listeditd_{{:id}}" style="display:none"> <div class="col"> <input class="touchspin1 input text-left" type="text" value="{{:cantidad}}" name="cantidad" onchange="pedido.actualizar({{:id}}, this);"/> </div> <div class="col"> <div class="input-group"> <div class="input-group-prepend"> <span class="input-group-text">S/</span> </div> <input type="text" name="precio" value="{{:precio}}" onchange="pedido.actualizarprecio({{:id}}, this);" class="form-control preciolist_{{:id}}" onFocus="this.select()" /> </div> </div> </div> </td> </tr> {{/for}} </tbody> <tfoot> <tr> <td class="text-right" colspan="4" style="padding: 10px">Total <b>S/ {{:total}}</b></td> </tr> </tfoot>
</script>
<?php if(Session::get('rol') <> 0) { ?>
<style type="text/css">
.btn-up{
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 25px;
}
.btn-down{
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 25px;
}
</style>
<?php } ?>